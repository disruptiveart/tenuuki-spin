<svelte:options customElement={{ tag: "tenuuki-spin-viewer", shadow: 'none' }} />

<script lang="ts">
import { onMount } from 'svelte'
import BezierEasing from 'bezier-easing'
import '../styles/spin-viewer.scss'
import type { TenuukiSpinViewerOptions } from '../types/TenuukiSpinViewerOptions'

type FrameChangePayload = {
  image_name: string
  index: number
  angle: number
  id?: string
  ref?: HTMLElement
}

// ----- Spinner state -----
export let options: TenuukiSpinViewerOptions = { images: [] } as TenuukiSpinViewerOptions
let currentFrame = 0
let currentFrameFloat = 0
let frameInterval: number = 60
let imgElement: HTMLImageElement
let containerElement: HTMLDivElement
let hostElement: HTMLElement | null = null
let rafId: number | undefined
let lastFrameChangeKey = ''

type SpinRunner = {
  totalSteps: number
  baseIntervalMs: number
  cycleLength: number
  curve: (t: number) => number
  maxStepDeltaPerTick: number
  startedAt: number
  appliedSteps: number
  isInfinite: boolean
  onStep: (stepCount: number) => void
  onComplete?: () => void
}
let activeSpin: SpinRunner | undefined

// ----- Preload -----
const preloadedImages: HTMLImageElement[] = []
const loadedFlags: boolean[] = []
let loadedCount = 0
let spinStarted = false

// ----- Drag / Momentum -----
let isDragging = false
let dragStartCoord = 0
let dragStartFrame = 0
let latestPointerCoord = 0
let dragRafId: number | undefined
const DRAG_SENSITIVITY = 2.5

let velocity = 0
let lastDragPositions: Array<{ coord: number; time: number }> = []
let momentumId: number | undefined
const MOMENTUM_FRICTION = 0.92
const VELOCITY_SAMPLES = 2

// ----- Utilities -----
const normalizeFrameIndex = (idx: number, total: number) => ((idx % total) + total) % total
const getShortestFrameDelta = (from: number, to: number, total: number) => {
  const direct = to - from
  const plusWrap = direct + total
  const minusWrap = direct - total
  if (Math.abs(plusWrap) < Math.abs(direct) && Math.abs(plusWrap) <= Math.abs(minusWrap)) return plusWrap
  if (Math.abs(minusWrap) < Math.abs(direct) && Math.abs(minusWrap) < Math.abs(plusWrap)) return minusWrap
  return direct
}
const getDirectionStep = (direction: 1 | -1 | undefined) => direction === -1 ? 1 : -1
const getSpinDirection = () => getDirectionStep(options?.direction)
const getInitialSpinDirection = () => getDirectionStep(options?.initialSpinDirection ?? options?.direction)
const getInitialFrameIndex = () => Math.min((options?.initialFrame ?? 1) - 1, options.images.length - 1)
const getEffectiveFrameInterval = () => {
  const baseInterval = options.frameInterval ?? frameInterval
  const normalizedBaseInterval = Number.isFinite(baseInterval) && baseInterval > 0 ? baseInterval : frameInterval
  const speedMultiplier = Number(options.speedMultiplier ?? 1)
  const normalizedSpeedMultiplier = Number.isFinite(speedMultiplier) && speedMultiplier > 0 ? speedMultiplier : 1
  return Math.max(0.5, normalizedBaseInterval / normalizedSpeedMultiplier)
}
const getEasingScope = () => (options.easingScope ?? 'single') === 'full' ? 'full' : 'single'
const getCycleLengthForEasing = (totalSteps: number, totalFrames: number) => {
  if (!Number.isFinite(totalSteps) || totalSteps <= 0) return Math.max(1, totalFrames)
  const normalizedSteps = Math.max(1, Math.floor(totalSteps))
  if (getEasingScope() === 'full') return normalizedSteps
  return Math.min(Math.max(1, totalFrames), normalizedSteps)
}
const CSS_BEZIER_PRESETS: Record<string, [number, number, number, number]> = {
  ease: [0.25, 0.1, 0.25, 1],
  'ease-in': [0.42, 0, 1, 1],
  'ease-out': [0, 0, 0.58, 1],
  'ease-in-out': [0.42, 0, 0.58, 1]
}

const parseBezierEasing = (value: string) => {
  const preset = CSS_BEZIER_PRESETS[value]
  if (preset) {
    return BezierEasing(...preset)
  }

  const match = value.match(/^cubic-bezier\(\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*\)$/i)
  if (!match) return null

  const x1 = Number(match[1])
  const y1 = Number(match[2])
  const x2 = Number(match[3])
  const y2 = Number(match[4])
  if (!Number.isFinite(x1) || !Number.isFinite(y1) || !Number.isFinite(x2) || !Number.isFinite(y2)) {
    return null
  }

  try {
    return BezierEasing(x1, y1, x2, y2)
  } catch {
    return null
  }
}

const easeOutBounce = (t: number) => {
  const n1 = 7.5625
  const d1 = 2.75

  if (t < 1 / d1) return n1 * t * t
  if (t < 2 / d1) {
    const x = t - 1.5 / d1
    return n1 * x * x + 0.75
  }
  if (t < 2.5 / d1) {
    const x = t - 2.25 / d1
    return n1 * x * x + 0.9375
  }

  const x = t - 2.625 / d1
  return n1 * x * x + 0.984375
}

const EASINGS_NET_CURVES: Record<string, (t: number) => number> = {
  linear: (t: number) => t,
  easeinquad: (t: number) => t * t,
  easeoutquad: (t: number) => 1 - Math.pow(1 - t, 2),
  easeinoutquad: (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
  easeincubic: (t: number) => t * t * t,
  easeoutcubic: (t: number) => 1 - Math.pow(1 - t, 3),
  easeinoutcubic: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  easeinquart: (t: number) => t * t * t * t,
  easeoutquart: (t: number) => 1 - Math.pow(1 - t, 4),
  easeinoutquart: (t: number) => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2),
  easeinquint: (t: number) => t * t * t * t * t,
  easeoutquint: (t: number) => 1 - Math.pow(1 - t, 5),
  easeinoutquint: (t: number) => (t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2),
  easeinsine: (t: number) => 1 - Math.cos((t * Math.PI) / 2),
  easeoutsine: (t: number) => Math.sin((t * Math.PI) / 2),
  easeinoutsine: (t: number) => -(Math.cos(Math.PI * t) - 1) / 2,
  easeinexpo: (t: number) => (t === 0 ? 0 : Math.pow(2, 10 * t - 10)),
  easeoutexpo: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  easeinoutexpo: (t: number) => {
    if (t === 0) return 0
    if (t === 1) return 1
    return t < 0.5
      ? Math.pow(2, 20 * t - 10) / 2
      : (2 - Math.pow(2, -20 * t + 10)) / 2
  },
  easeincirc: (t: number) => 1 - Math.sqrt(1 - Math.pow(t, 2)),
  easeoutcirc: (t: number) => Math.sqrt(1 - Math.pow(t - 1, 2)),
  easeinoutcirc: (t: number) => {
    return t < 0.5
      ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2
      : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2
  },
  easeinback: (t: number) => {
    const c1 = 1.70158
    const c3 = c1 + 1
    return c3 * t * t * t - c1 * t * t
  },
  easeoutback: (t: number) => {
    const c1 = 1.70158
    const c3 = c1 + 1
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
  },
  easeinoutback: (t: number) => {
    const c1 = 1.70158
    const c2 = c1 * 1.525
    return t < 0.5
      ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
      : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (2 * t - 2) + c2) + 2) / 2
  },
  easeinelastic: (t: number) => {
    const c4 = (2 * Math.PI) / 3
    if (t === 0) return 0
    if (t === 1) return 1
    return -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4)
  },
  easeoutelastic: (t: number) => {
    const c4 = (2 * Math.PI) / 3
    if (t === 0) return 0
    if (t === 1) return 1
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
  },
  easeinoutelastic: (t: number) => {
    const c5 = (2 * Math.PI) / 4.5
    if (t === 0) return 0
    if (t === 1) return 1
    return t < 0.5
      ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c5)) / 2
      : (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c5)) / 2 + 1
  },
  easeinbounce: (t: number) => 1 - easeOutBounce(1 - t),
  easeoutbounce: easeOutBounce,
  easeinoutbounce: (t: number) => {
    return t < 0.5
      ? (1 - easeOutBounce(1 - 2 * t)) / 2
      : (1 + easeOutBounce(2 * t - 1)) / 2
  }
}

const getNormalizedCurveName = () => (options.rotationCurve ?? 'linear').trim().toLowerCase().replace(/[^a-z0-9]/g, '')

const getRotationCurve = () => {
  const rawCurve = (options.rotationCurve ?? 'linear').trim()
  const curve = rawCurve.toLowerCase()

  const bezierCurve = parseBezierEasing(curve)
  if (bezierCurve) {
    return bezierCurve
  }

  if (curve === 'standard') {
    return (t: number) => t * t * (3 - 2 * t)
  }

  const normalizedCurve = getNormalizedCurveName()
  const easingsNetCurve = EASINGS_NET_CURVES[normalizedCurve]
  if (easingsNetCurve) return easingsNetCurve

  return (t: number) => t
}

const getImageName = (imageSrc: string) => {
  if (!imageSrc) return ''
  try {
    const parsed = new URL(imageSrc, 'http://localhost')
    const lastSegment = parsed.pathname.split('/').pop() || imageSrc
    return decodeURIComponent(lastSegment)
  } catch {
    const lastSegment = imageSrc.split('/').pop() || imageSrc
    return decodeURIComponent(lastSegment)
  }
}

const emitFrameChange = () => {
  const total = options.images.length
  if (total === 0) return

  const index = normalizeFrameIndex(currentFrame, total)
  const imageSrc = options.images[index] || ''
  const key = `${total}:${index}:${imageSrc}`
  if (key === lastFrameChangeKey) return
  lastFrameChangeKey = key

  const payload: FrameChangePayload = {
    image_name: getImageName(imageSrc),
    index,
    angle: (index / total) * 360,
    ref: hostElement ?? undefined,
    ...(hostElement?.id ? { id: hostElement.id } : {})
  }

  const hostCallback = (hostElement as any)?.onFrameChange
  if (typeof hostCallback === 'function') {
    hostCallback(payload)
  }

  if (typeof options.onFrameChange === 'function') {
    options.onFrameChange(payload)
  }

  hostElement?.dispatchEvent(new CustomEvent('framechange', { detail: payload }))
}

const getMaxStepDeltaPerTick = (curveName: string, totalFrames: number) => {
  const baseCap = Math.max(1, Math.ceil(totalFrames / 24))
  if (curveName.includes('bounce')) return Math.min(2, baseCap)
  if (curveName.includes('elastic')) return Math.min(3, Math.max(2, baseCap))
  return Math.max(4, baseCap)
}

const stopSpin = () => {
  activeSpin = undefined
  if (rafId !== undefined) {
    cancelAnimationFrame(rafId)
    rafId = undefined
  }
}

const clamp01 = (n: number) => Math.max(0, Math.min(1, n))

const getEasedStepsForCycles = (
  linearSteps: number,
  cycleLength: number,
  curve: (t: number) => number
) => {
  if (cycleLength <= 1) return linearSteps
  const safeLinearSteps = Math.max(0, linearSteps)
  const completeCycles = Math.floor(safeLinearSteps / cycleLength)
  const cycleProgress = (safeLinearSteps - completeCycles * cycleLength) / cycleLength
  const easedCycleProgress = clamp01(curve(clamp01(cycleProgress)))
  return completeCycles * cycleLength + easedCycleProgress * cycleLength
}

const getSpinTargetSteps = (spin: SpinRunner, now: number) => {
  const elapsedMs = Math.max(0, now - spin.startedAt)
  const linearSteps = elapsedMs / spin.baseIntervalMs

  if (spin.isInfinite) {
    return Math.floor(getEasedStepsForCycles(linearSteps, spin.cycleLength, spin.curve))
  }

  const cappedLinearSteps = Math.min(spin.totalSteps, linearSteps)
  if (spin.cycleLength >= spin.totalSteps) {
    const progress = spin.totalSteps <= 0 ? 1 : clamp01(cappedLinearSteps / spin.totalSteps)
    const easedProgress = clamp01(spin.curve(progress))
    return Math.floor(easedProgress * spin.totalSteps)
  }

  return Math.floor(Math.min(spin.totalSteps, getEasedStepsForCycles(cappedLinearSteps, spin.cycleLength, spin.curve)))
}

const startSpin = (
  totalSteps: number,
  onStep: (stepCount: number) => void,
  onComplete?: () => void,
  cycleLength: number = totalSteps
) => {
  const finiteSteps = Number.isFinite(totalSteps) ? Math.max(0, Math.floor(totalSteps)) : Number.POSITIVE_INFINITY
  if (Number.isFinite(finiteSteps) && finiteSteps <= 0) {
    onComplete?.()
    return
  }

  stopSpin()

  const baseIntervalMs = getEffectiveFrameInterval()
  const curveName = getNormalizedCurveName()
  const curve = getRotationCurve()
  const normalizedCycleLength = Math.max(1, Math.floor(Number.isFinite(cycleLength) ? cycleLength : 1))
  const maxStepDeltaPerTick = getMaxStepDeltaPerTick(curveName, options.images.length)

  activeSpin = {
    totalSteps: finiteSteps,
    baseIntervalMs,
    cycleLength: normalizedCycleLength,
    curve,
    maxStepDeltaPerTick,
    startedAt: performance.now(),
    appliedSteps: 0,
    isInfinite: !Number.isFinite(finiteSteps),
    onStep,
    onComplete
  }

  const tick = (time: number) => {
    if (!activeSpin) return

    const targetSteps = getSpinTargetSteps(activeSpin, time)
    const stepDelta = targetSteps - activeSpin.appliedSteps
    if (stepDelta > 0) {
      const appliedDelta = Math.min(stepDelta, activeSpin.maxStepDeltaPerTick)
      activeSpin.onStep(appliedDelta)
      activeSpin.appliedSteps += appliedDelta
    }

    if (!activeSpin.isInfinite && activeSpin.appliedSteps >= activeSpin.totalSteps) {
      const onCompleteCallback = activeSpin.onComplete
      stopSpin()
      onCompleteCallback?.()
      return
    }

    rafId = requestAnimationFrame(tick)
  }

  rafId = requestAnimationFrame(tick)
}

// ----- Image generation -----
const buildImagesFromTemplate = (template: string, count: number, padding: number) =>
  Array.from({ length: count }, (_, i) => template.replace(`{${options.replacementToken}}`, String(i + 1).padStart(padding, '0')))

// ----- Preload -----
const markLoaded = (i: number) => {
  if (!loadedFlags[i]) {
    loadedFlags[i] = true
    loadedCount++
    maybeBeginSpin()
  }
}

/**
 * Allows navigating to a specific frame directly. If the viewer is currently auto-spinning or in the middle of an animated spin, it will stop and jump to the specified frame immediately.
 * @param i: frame number to navigate to
 */
export function goTo(i: number) {
  const total = options.images.length
  if (total === 0) return

  stopSpin()
  stopMomentum()

  const targetFrame = normalizeFrameIndex(i, total)
  currentFrame = targetFrame
  currentFrameFloat = targetFrame
}

/**
 * Animates spinning to a specific frame from the current frame.
 * By default it performs a linear spin in the configured direction.
 * Set `shortestPath` to true to take the shortest route to the target frame.
 * @param i: target frame number
 * @param rotations: extra full loops before stopping (linear mode)
 * @param shortestPath: when true, ignore extra rotations and move via shortest route
 */
export function spinTo(i: number, rotations: number = 1, shortestPath: boolean = true) {
  const total = options.images.length
  if (total === 0) return

  stopSpin()
  stopMomentum()

  const targetFrame = normalizeFrameIndex(i, total)
  const current = normalizeFrameIndex(Math.floor(currentFrameFloat), total)
  const linearDir = getSpinDirection()

  const forwardSteps = normalizeFrameIndex(targetFrame - current, total)
  const backwardSteps = normalizeFrameIndex(current - targetFrame, total)

  let dir = linearDir
  let steps = 0

  if (shortestPath) {
    if (forwardSteps <= backwardSteps) {
      dir = 1
      steps = forwardSteps
    } else {
      dir = -1
      steps = backwardSteps
    }
  } else {
    const linearSteps = linearDir === 1 ? forwardSteps : backwardSteps
    const extraRotations = Math.max(0, Math.floor(rotations))
    steps = linearSteps + extraRotations * total
  }

  if (steps === 0) return

  startSpin(steps, (stepCount) => {
    currentFrameFloat = normalizeFrameIndex(currentFrameFloat + dir * stepCount, total)
    currentFrame = Math.floor(currentFrameFloat)
  }, undefined, getCycleLengthForEasing(steps, total))
}

/**
 * Starts auto-spinning the viewer. If already spinning, this function does nothing. The spin will continue indefinitely until `stop()` is called or the user interacts with the viewer (e.g. dragging).
 * @param times: number of full rotations to perform before stopping (default: <= 0 for infinite loop)
 */
export function play(times: number = 0) {
  const total = options.images.length
  if (total === 0) return

  if (activeSpin) return

  stopMomentum()
  const dir = getSpinDirection()
  const rotationCount = Math.max(0, Math.floor(times))
  const maxSteps = rotationCount === 0 ? Number.POSITIVE_INFINITY : rotationCount * total

  startSpin(maxSteps, (stepCount) => {
    currentFrame = normalizeFrameIndex(currentFrame + dir * stepCount, total)
    currentFrameFloat = currentFrame
  }, undefined, getCycleLengthForEasing(maxSteps, total))
}

export function stop() {
  stopSpin()
}

export function isPlaying() {
  return !!activeSpin
}

export function spinToStop(i: number, rotations: number = 1) {
  spinTo(i, rotations, false)
}

/**
 * Replays the spin from the current frame. If `i` is provided, it will jump to that frame first before replaying.
 * `rotations` controls how many full loops to perform before stopping.
 * @param rotations: number of full rotations to perform (default: 1)
 * @param i: frame number
 */
export function replay(rotations: number = 1, i: number | null = null) {
  const total = options.images.length
  if (total === 0) return

  if (i !== null) {
    currentFrame = normalizeFrameIndex(i, total)
    currentFrameFloat = currentFrame
  }

  const rotationCount = Math.max(0, Math.floor(rotations))
  if (rotationCount === 0) return

  stopSpin()

  const steps = rotationCount * total
  const dir = getSpinDirection()
  startSpin(steps, (stepCount) => {
    currentFrame = normalizeFrameIndex(currentFrame + dir * stepCount, total)
    currentFrameFloat = currentFrame
  }, undefined, getCycleLengthForEasing(steps, total))
}

const preloadImagesProgressive = (chunkSize = 10, delay = 50) => {
  let index = 0

  const loadChunk = () => {
    for (let i = index; i < index + chunkSize && i < options.images.length; i++) {
      const img = new Image()
      loadedFlags[i] = false
      img.onload = () => markLoaded(i)
      img.onerror = () => { console.warn(`[TenuukiSpinViewer] Failed to load image ${i}`); markLoaded(i) }
      img.src = options.images[i]
      preloadedImages[i] = img
    }
    index += chunkSize
    if (index < options.images.length) setTimeout(loadChunk, delay)
  }

  loadChunk()
}

// ----- Initial Spin -----
const maybeBeginSpin = () => {
  if (spinStarted || !options.initialSpin) return
  const total = options.images.length
  const plan = getInitialSpinPlan()
  let ready = true
  for (let step = 0; step <= plan.steps; step++) {
    const frame = normalizeFrameIndex(plan.startFrame + plan.dir * step, total)
    if (!loadedFlags[frame]) {
      ready = false
      break
    }
  }
  if (ready) { spinStarted = true; beginInitialSpinForwardToInitialFrame() }
}

const getInitialSpinPlan = () => {
  const total = options.images.length
  const target = getInitialFrameIndex()
  const configuredDir = getInitialSpinDirection()
  const spinOffset = Number(options.spinOffset ?? 0)
  const offsetFrames = Math.round((spinOffset / 360) * total)

  if (offsetFrames === 0) {
    return {
      startFrame: target,
      targetFrame: target,
      steps: 0,
      dir: configuredDir
    }
  }

  const dir = offsetFrames >= 0 ? configuredDir : -configuredDir
  const steps = Math.abs(offsetFrames)
  const startFrame = normalizeFrameIndex(target - dir * steps, total)

  return {
    startFrame,
    targetFrame: target,
    steps,
    dir
  }
}

const beginInitialSpinForwardToInitialFrame = () => {
  if (!options.initialSpin) return
  stopSpin()

  const total = options.images.length
  const plan = getInitialSpinPlan()

  currentFrame = plan.startFrame
  currentFrameFloat = plan.startFrame

  startSpin(plan.steps, (stepCount) => {
    currentFrame = normalizeFrameIndex(currentFrame + plan.dir * stepCount, total)
    currentFrameFloat = currentFrame
  }, () => {
    currentFrame = plan.targetFrame
    currentFrameFloat = plan.targetFrame
  }, getCycleLengthForEasing(plan.steps, total))
}

// ----- Momentum -----
const stopMomentum = () => {
  if (momentumId) cancelAnimationFrame(momentumId)
  momentumId = undefined
  velocity = 0
}

const startMomentum = () => {
  const total = options.images.length
  if (total === 0 || Math.abs(velocity) < 0.1) return

  let physicsFrameFloat = currentFrameFloat
  let renderFrameFloat = currentFrameFloat
  let lastTime = performance.now()
  const step = (time: number) => {
    const rawDt = (time - lastTime) / 1000
    const dt = Math.min(1 / 30, Math.max(1 / 240, rawDt || 1 / 60))
    lastTime = time

    physicsFrameFloat = normalizeFrameIndex(physicsFrameFloat + velocity * dt, total)
    const follow = 1 - Math.exp(-dt * 28)
    const frameDelta = getShortestFrameDelta(renderFrameFloat, physicsFrameFloat, total)
    renderFrameFloat = normalizeFrameIndex(renderFrameFloat + frameDelta * follow, total)

    currentFrameFloat = renderFrameFloat
    currentFrame = Math.floor(currentFrameFloat)
    velocity *= Math.pow(MOMENTUM_FRICTION, dt * 60)

    if (Math.abs(velocity) >= 0.01) {
      momentumId = requestAnimationFrame(step)
      return
    }

    currentFrameFloat = physicsFrameFloat
    currentFrame = Math.floor(currentFrameFloat)
    momentumId = undefined
  }
  momentumId = requestAnimationFrame(step)
}

// ----- Drag / Pointer -----
const getPointerCoord = (e: PointerEvent) => options.axis === 'y' ? e.clientY : e.clientX

const handlePointerDown = (e: PointerEvent) => {
  if (options.draggable === false) return
  isDragging = true
  dragStartCoord = getPointerCoord(e)
  latestPointerCoord = dragStartCoord
  dragStartFrame = currentFrameFloat
  lastDragPositions = [{ coord: dragStartCoord, time: performance.now() }]
  stopSpin()
  stopMomentum()
  if (imgElement) imgElement.setPointerCapture(e.pointerId)
  window.addEventListener('pointermove', handlePointerMove)
  window.addEventListener('pointerup', handlePointerUp)
  window.addEventListener('pointercancel', handlePointerUp)
}

const processDragFrame = () => {
  dragRafId = undefined
  if (!isDragging) return
  const total = options.images.length
  if (total === 0) return
  const delta = (latestPointerCoord - dragStartCoord) * getSpinDirection()
  currentFrameFloat = normalizeFrameIndex(dragStartFrame + delta / DRAG_SENSITIVITY, total)
  currentFrame = Math.floor(currentFrameFloat)
  lastDragPositions.push({ coord: latestPointerCoord, time: performance.now() })
  if (lastDragPositions.length > VELOCITY_SAMPLES) lastDragPositions.shift()
}

const handlePointerMove = (e: PointerEvent) => {
  if (!isDragging) return
  latestPointerCoord = getPointerCoord(e)
  if (dragRafId === undefined) {
    dragRafId = requestAnimationFrame(processDragFrame)
  }
}

const handlePointerUp = (e: PointerEvent) => {
  if (!isDragging) return
  latestPointerCoord = getPointerCoord(e)
  if (dragRafId !== undefined) {
    cancelAnimationFrame(dragRafId)
    dragRafId = undefined
  }
  processDragFrame()
  isDragging = false
  window.removeEventListener('pointermove', handlePointerMove)
  window.removeEventListener('pointerup', handlePointerUp)
  window.removeEventListener('pointercancel', handlePointerUp)
  if (imgElement) imgElement.releasePointerCapture(e.pointerId)
  if (lastDragPositions.length >= 2) {
    const first = lastDragPositions[0]
    const last = lastDragPositions[lastDragPositions.length - 1]
    const dt = (last.time - first.time) / 1000
    const dCoord = last.coord - first.coord
    if (dt > 0) {
      velocity = (dCoord / DRAG_SENSITIVITY / dt) * getSpinDirection()
      if (Math.abs(velocity) > 0.1) startMomentum()
    }
  }
  lastDragPositions = []
}

// ----- Lifecycle -----
onMount(() => {
  if (!containerElement) return
  const element = containerElement as HTMLElement;
  const host = (element.closest('tenuuki-spin-viewer') ?? element.parentElement) as HTMLElement | null;

  if (!host) {
    return {};
  }
  hostElement = host

  const imageBaseUrl = host.getAttribute('data-image-base-url')
  const imageCount = parseInt(host.getAttribute('data-image-count') || '0', 10)
  const rawImageNumberPadding = host.getAttribute('data-image-number-padding')
  const parsedImageNumberPadding = rawImageNumberPadding === null || rawImageNumberPadding.trim() === ''
    ? 0
    : parseInt(rawImageNumberPadding, 10)
  const imageNumberPadding = Number.isFinite(parsedImageNumberPadding) && parsedImageNumberPadding >= 0
    ? parsedImageNumberPadding
    : 0

  options.axis = host.getAttribute('data-axis') === 'y' ? 'y' : 'x'
  options.direction = host.getAttribute('data-direction') === '-1' ? -1 : 1
  const initialSpinDirectionAttribute = host.getAttribute('data-initial-spin-direction')
  options.initialSpinDirection = initialSpinDirectionAttribute === '-1'
    ? -1
    : initialSpinDirectionAttribute === '1'
      ? 1
      : options.direction
  options.draggable = host.getAttribute('data-draggable') !== 'false'
  options.showArrows = host.getAttribute('data-show-arrows') === 'true'
  options.showRotationHints = host.getAttribute('data-show-rotation-hints') === 'true'
  options.initialSpin = host.getAttribute('data-initial-spin') !== 'false'
  options.spinOffset = parseInt(host.getAttribute('data-spin-offset') || '0', 10)
  options.initialFrame = parseInt(host.getAttribute('data-initial-frame') || '1', 10)
  options.frameInterval = 60
  options.speedMultiplier = parseFloat(host.getAttribute('data-speed-multiplier') || '1')
  options.rotationCurve = host.getAttribute('data-easing') || 'linear'
  options.easingScope = host.getAttribute('data-easing-scope') === 'full' ? 'full' : 'single'
  options.replacementToken = host.getAttribute('data-replacement-token') || 'frame'

  if (imageBaseUrl && imageCount > 0) {
    options.images = buildImagesFromTemplate(imageBaseUrl, imageCount, imageNumberPadding)
  }

  currentFrame = options.initialSpin ? getInitialSpinPlan().startFrame : 0
  currentFrameFloat = currentFrame
  preloadImagesProgressive()
  return () => {
    hostElement = null
    stopSpin()
    stopMomentum()
  }
})

$: currentSrc = options.images?.[currentFrame] || ''
$: {
  currentFrame
  hostElement
  emitFrameChange()
}
</script>

<div class="tenuuki-spin-viewer" bind:this={containerElement}>
  {#if currentSrc}
    <img
      bind:this={imgElement}
      src={currentSrc}
      alt="Spinner frame {currentFrame}"
      draggable="false"
      style="
        cursor: {isDragging ? 'grabbing' : 'grab'};
        user-select: none;
        touch-action: none;
      "
      on:pointerdown={handlePointerDown}
    />
    {#if options.showRotationHints}
      <span class="left-hint-arrow" aria-hidden="true">
        {options.axis === 'y' ? '↑' : '←'}
      </span>
      <span class="right-hint-arrow" aria-hidden="true">
        {options.axis === 'y' ? '↓' : '→'}
      </span>
    {/if}
    {#if options.showArrows}
      <button
        class="left-spin-arrow"
        type="button"
        aria-label="Spin left"
        on:click={() => goTo(currentFrame - 1)}
      >&#8249;</button>
      <button
        class="right-spin-arrow"
        type="button"
        aria-label="Spin right"
        on:click={() => goTo(currentFrame + 1)}
      >&#8250;</button>
    {/if}
  {:else}
    <p>Loading...</p>
  {/if}
</div>