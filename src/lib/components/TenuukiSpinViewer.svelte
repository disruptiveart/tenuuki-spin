<svelte:options customElement={{ tag: "tenuuki-spin-viewer", shadow: 'none' }} />

<script lang="ts">
import { onMount } from 'svelte'
import { portal } from '../utils/portal'
import '../styles/spin-viewer.scss'
import type { TenuukiSpinViewerOptions } from '../types/TenuukiSpinViewerOptions'
import { defaultTenuukiSpinAnimationAdapter } from '../types/TenuukiSpinAnimationAdapter'

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
let stopAnimation: (() => void) | undefined
let lastFrameChangeKey = ''
let contextMenuVisible = false
let contextMenuX = 0
let contextMenuY = 0

type SpinRun = object
let activeSpin: SpinRun | undefined

// ----- Preload -----
const preloadedImages: HTMLImageElement[] = []
const loadedFlags: boolean[] = []
let loadedCount = 0
let loadFailedCount = 0
let preloadCancelled = false
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

const stopSpin = () => {
  activeSpin = undefined
  stopAnimation?.()
  stopAnimation = undefined
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

  const run: SpinRun = {}
  activeSpin = run
  const adapter = options.animationAdapter ?? defaultTenuukiSpinAnimationAdapter
  const stopAdapter = adapter.start({
    totalSteps: finiteSteps,
    cycleLength: Math.max(1, Math.floor(Number.isFinite(cycleLength) ? cycleLength : 1)),
    frameIntervalMs: getEffectiveFrameInterval(),
    totalFrames: options.images.length,
    easing: options.rotationCurve ?? 'linear',
    onUpdate: (stepDelta) => {
      if (activeSpin === run) onStep(stepDelta)
    },
    onComplete: () => {
      if (activeSpin !== run) return
      activeSpin = undefined
      stopAnimation = undefined
      onComplete?.()
    }
  })
  stopAnimation = stopAdapter
  if (activeSpin !== run) {
    stopAdapter()
    stopAnimation = undefined
  }
}

// ----- Image generation -----
const buildImagesFromTemplate = (template: string, count: number, padding: number) =>
  Array.from({ length: count }, (_, i) => template.replace(`{${options.replacementToken}}`, String(i + 1).padStart(padding, '0')))

// ----- Preload -----
const markLoaded = (i: number, failed = false) => {
  if (!loadedFlags[i]) {
    loadedFlags[i] = true
    loadedCount++
    if (failed) loadFailedCount++
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

const getArrowMarkup = (value: string | HTMLElement | undefined, fallback: string) => {
  if (typeof value === 'string') return value || fallback
  return value?.outerHTML || fallback
}

const handleArrowClick = (event: MouseEvent, delta: number) => {
  event.stopPropagation()
  goTo(Math.floor(currentFrameFloat) + delta)
}

const handleContextMenu = (event: MouseEvent) => {
  event.preventDefault()
  const maxX = window.scrollX + window.innerWidth - 150
  const maxY = window.scrollY + window.innerHeight - 40
  contextMenuX = Math.min(event.pageX, Math.max(window.scrollX, maxX))
  contextMenuY = Math.min(event.pageY, Math.max(window.scrollY, maxY))
  contextMenuVisible = true
  window.addEventListener('pointerdown', closeContextMenu, { once: true })
  window.addEventListener('blur', closeContextMenu, { once: true })
}

const closeContextMenu = () => {
  contextMenuVisible = false
  window.removeEventListener('pointerdown', closeContextMenu)
  window.removeEventListener('blur', closeContextMenu)
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

const preloadImagesProgressive = () => {
  const total = options.images.length
  const firstFrame = normalizeFrameIndex(getInitialSpinPlan().startFrame, total)
  const priorityFrames = [firstFrame, getInitialFrameIndex()]
  const queue = [...new Set([
    ...priorityFrames,
    ...Array.from({ length: total }, (_, index) => index)
  ])]
  const connection = (navigator as Navigator & {
    connection?: { effectiveType?: string; saveData?: boolean }
  }).connection
  const constrained = connection?.saveData === true || /(^|-)2g$/.test(connection?.effectiveType ?? '')
  const concurrency = constrained ? 2 : 4
  let activeRequests = 0
  let nextIndex = 0

  const pump = () => {
    if (preloadCancelled) return
    while (activeRequests < concurrency && nextIndex < queue.length) {
      const frame = queue[nextIndex++]
      if (loadedFlags[frame]) continue

      activeRequests++
      const img = new Image()
      img.decoding = 'async'
      img.fetchPriority = nextIndex <= priorityFrames.length ? 'high' : 'low'
      const settle = (failed: boolean) => {
        if (preloadCancelled) return
        activeRequests--
        if (failed) console.warn(`[TenuukiSpinViewer] Failed to load image ${frame}`)
        markLoaded(frame, failed)
        pump()
      }
      img.onload = () => settle(false)
      img.onerror = () => settle(true)
      img.src = options.images[frame]
      preloadedImages[frame] = img
    }
  }

  pump()
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

  let lastTime = performance.now()
  const step = (time: number) => {
    const dt = (time - lastTime) / 1000
    lastTime = time

    currentFrameFloat = normalizeFrameIndex(currentFrameFloat + velocity * dt, total)
    currentFrame = Math.floor(currentFrameFloat)
    velocity *= Math.pow(MOMENTUM_FRICTION, dt * 60)
    momentumId = Math.abs(velocity) >= 0.01
      ? requestAnimationFrame(step)
      : undefined
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
}

const handlePointerMove = (e: PointerEvent) => {
  if (!isDragging) return
  latestPointerCoord = getPointerCoord(e)
  lastDragPositions.push({ coord: latestPointerCoord, time: performance.now() })
  if (lastDragPositions.length > VELOCITY_SAMPLES) lastDragPositions.shift()
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
    const releasedAt = performance.now()
    const dt = (last.time - first.time) / 1000
    const dCoord = last.coord - first.coord
    if (dt > 0 && releasedAt - last.time <= 100) {
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
  options.arrowUp = host.getAttribute('data-arrow-up') ?? options.arrowUp ?? '↑'
  options.arrowDown = host.getAttribute('data-arrow-down') ?? options.arrowDown ?? '↓'
  options.arrowLeft = host.getAttribute('data-arrow-left') ?? options.arrowLeft ?? '←'
  options.arrowRight = host.getAttribute('data-arrow-right') ?? options.arrowRight ?? '→'
  
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
    closeContextMenu()
    preloadCancelled = true
    for (const img of preloadedImages) img.src = ''
    hostElement = null
    stopSpin()
    stopMomentum()
  }
})

$: currentSrc = options.images?.[currentFrame] || ''
$: loadTotal = options.images?.length ?? 0
$: loadingPercent = loadTotal > 0 ? Math.round((loadedCount / loadTotal) * 100) : 0
$: isLoading = loadTotal > 0 && loadedCount < loadTotal
$: {
  currentFrame
  hostElement
  emitFrameChange()
}
</script>

<div
  class="tenuuki-spin-viewer"
  bind:this={containerElement}
  on:contextmenu={handleContextMenu}
  role="presentation"
>
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
      <div class="rotation-hints">
        <span class="left-hint-arrow" aria-hidden="true">
          {@html getArrowMarkup(options.axis === 'y' ? options.arrowUp : options.arrowLeft, options.axis === 'y' ? '↑' : '←')}
        </span>
        <span class="right-hint-arrow" aria-hidden="true">
          {@html getArrowMarkup(options.axis === 'y' ? options.arrowDown : options.arrowRight, options.axis === 'y' ? '↓' : '→')}
        </span>
      </div>
    {/if}
    {#if options.showArrows}
      <button
        class="left-spin-arrow"
        type="button"
        aria-label={options.axis === 'y' ? 'Spin up' : 'Spin left'}
        on:click={(event) => handleArrowClick(event, -1)}
      >{@html getArrowMarkup(options.axis === 'y' ? options.arrowUp : options.arrowLeft, options.axis === 'y' ? '↑' : '←')}</button>
      <button
        class="right-spin-arrow"
        type="button"
        aria-label={options.axis === 'y' ? 'Spin down' : 'Spin right'}
        on:click={(event) => handleArrowClick(event, 1)}
      >{@html getArrowMarkup(options.axis === 'y' ? options.arrowDown : options.arrowRight, options.axis === 'y' ? '↓' : '→')}</button>
    {/if}
  {:else}
    <p>Loading...</p>
  {/if}
  {#if contextMenuVisible}
    <div
      use:portal
      class="tenuuki-spin-context-menu"
      style="left: {contextMenuX}px; top: {contextMenuY}px;"
      role="menu"
      tabindex="-1"
      on:pointerdown|stopPropagation
    >
      <div class="tenuuki-spin-context-menu-item" role="menuitem">version: {__TENUUKI_SPIN_VERSION__}</div>
      <div class="tenuuki-spin-context-menu-item" role="menuitem">website: <a href="https://disruptiveart.com?utm_source=tenuuki-spin" target="_blank">Disruptive Art Studio</a></div>
    </div>
  {/if}
  {#if isLoading}
    <div
      class:loading-has-errors={loadFailedCount > 0}
      class="tenuuki-spin-loading"
      role="progressbar"
      aria-label="Loading spin frames"
      aria-valuemin="0"
      aria-valuemax={loadTotal}
      aria-valuenow={loadedCount}
      aria-valuetext={`${loadingPercent}% loaded`}
    >
      <span class="tenuuki-spin-loading-indicator" aria-hidden="true"></span>
      <span>{loadingPercent}%</span>
    </div>
  {/if}
</div>