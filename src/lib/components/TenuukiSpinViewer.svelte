<svelte:options customElement={{ tag: "tenuuki-spin-viewer", shadow: 'none' }} />

<script lang="ts">
import { onMount } from 'svelte'
import '../styles/spin-viewer.scss'
import type { TenuukiSpinViewerOptions } from '$lib/types/TenuukiSpinViewerOptions'

// ----- Spinner state -----
export let options: TenuukiSpinViewerOptions = { images: [] } as TenuukiSpinViewerOptions
let currentFrame = 0
let currentFrameFloat = 0
let frameInterval: number = 60
let imgElement: HTMLImageElement
let containerElement: HTMLDivElement
let spinInterval: ReturnType<typeof setInterval> | undefined
let loop = false

// ----- Preload -----
const preloadedImages: HTMLImageElement[] = []
const loadedFlags: boolean[] = []
let loadedCount = 0
let spinStarted = false

// ----- Drag / Momentum -----
let isDragging = false
let dragStartCoord = 0
let dragStartFrame = 0
const DRAG_SENSITIVITY = 2.5

let velocity = 0
let lastDragPositions: Array<{ coord: number; time: number }> = []
let momentumId: number | undefined
const MOMENTUM_FRICTION = 0.92
const VELOCITY_SAMPLES = 2

// ----- Utilities -----
const normalizeFrameIndex = (idx: number, total: number) => ((idx % total) + total) % total
const getSpinDirection = () => options?.direction === -1 ? 1 : -1
const getInitialFrameIndex = () => Math.min((options?.initialFrame ?? 1) - 1, options.images.length - 1)

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

  if (spinInterval) {
    clearInterval(spinInterval)
    spinInterval = undefined
  }
  stopMomentum()

  const targetFrame = normalizeFrameIndex(i, total)
  spinInterval = setInterval(() => {
    currentFrame = targetFrame
    currentFrameFloat = targetFrame
    if (spinInterval) {
      clearInterval(spinInterval)
      spinInterval = undefined
    }
  }, options.frameInterval ?? frameInterval)
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

  if (spinInterval) {
    clearInterval(spinInterval)
    spinInterval = undefined
  }
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

  let stepsRemaining = steps
  spinInterval = setInterval(() => {
    if (stepsRemaining <= 0) {
      clearInterval(spinInterval)
      spinInterval = undefined
      return
    }

    currentFrameFloat = normalizeFrameIndex(currentFrameFloat + dir, total)
    currentFrame = Math.floor(currentFrameFloat)
    stepsRemaining--
  }, options.frameInterval ?? frameInterval)
}

/**
 * Starts auto-spinning the viewer. If already spinning, this function does nothing. The spin will continue indefinitely until `stop()` is called or the user interacts with the viewer (e.g. dragging).
 * @param times: number of full rotations to perform before stopping (default: <= 0 for infinite loop)
 */
export function play(times: number = 0) {
  if (times <= 0) loop = true;
  if (spinInterval) return;

  spinInterval = setInterval(() => {
    const total = options.images.length
    if (total === 0) return
    currentFrame = normalizeFrameIndex(currentFrame + getSpinDirection(), total)
    currentFrameFloat = currentFrame
  }, options.frameInterval ?? frameInterval)
}

export function stop() {
  if (spinInterval) {
    clearInterval(spinInterval)
    spinInterval = undefined
  }
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

  if (spinInterval) {
    clearInterval(spinInterval)
  }

  let stepsRemaining = rotationCount * total
  
  spinInterval = setInterval(() => {
    if (stepsRemaining <= 0) {
      clearInterval(spinInterval)
      spinInterval = undefined
      return
    }

    currentFrame = normalizeFrameIndex(currentFrame + getSpinDirection(), total)
    currentFrameFloat = currentFrame
    stepsRemaining--
  }, options.frameInterval ?? frameInterval)
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
  const startFrame = getStartFrameFromSpinOffset()
  const targetFrame = getInitialFrameIndex()
  let ready = true
  for (let i = startFrame; i !== normalizeFrameIndex(targetFrame + getSpinDirection(), total); i = normalizeFrameIndex(i + getSpinDirection(), total)) {
    if (!loadedFlags[i]) { ready = false; break }
  }
  if (ready) { spinStarted = true; beginInitialSpinForwardToInitialFrame() }
}

const getStartFrameFromSpinOffset = () => {
  const total = options.images.length
  const target = getInitialFrameIndex()
  const offsetFrames = Math.round(((options.spinOffset ?? 0) % 360) / 360 * total)
  return normalizeFrameIndex(target - offsetFrames, total)
}

const beginInitialSpinForwardToInitialFrame = () => {
  if (!options.initialSpin) return
  if (spinInterval) clearInterval(spinInterval)

  const total = options.images.length
  const startFrame = getStartFrameFromSpinOffset()
  const targetFrame = getInitialFrameIndex()
  const dir = getSpinDirection()

  currentFrame = startFrame
  currentFrameFloat = startFrame

  spinInterval = setInterval(() => {
    currentFrame = normalizeFrameIndex(currentFrame + dir, total)
    currentFrameFloat = currentFrame
    if (currentFrame === targetFrame) {
      clearInterval(spinInterval)
      spinInterval = undefined
    }
  }, options.frameInterval ?? frameInterval)
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
    if (Math.abs(velocity) >= 0.01) momentumId = requestAnimationFrame(step)
    else momentumId = undefined
  }
  momentumId = requestAnimationFrame(step)
}

// ----- Drag / Pointer -----
const getPointerCoord = (e: PointerEvent) => options.axis === 'y' ? e.clientY : e.clientX

const handlePointerDown = (e: PointerEvent) => {
  if (options.draggable === false) return
  isDragging = true
  dragStartCoord = getPointerCoord(e)
  dragStartFrame = currentFrameFloat
  lastDragPositions = [{ coord: dragStartCoord, time: performance.now() }]
  if (spinInterval) { clearInterval(spinInterval); spinInterval = undefined }
  stopMomentum()
  if (imgElement) imgElement.setPointerCapture(e.pointerId)
  window.addEventListener('pointermove', handlePointerMove)
  window.addEventListener('pointerup', handlePointerUp)
  window.addEventListener('pointercancel', handlePointerUp)
}

const handlePointerMove = (e: PointerEvent) => {
  if (!isDragging) return
  const total = options.images.length
  const pointerCoord = getPointerCoord(e)
  const delta = (pointerCoord - dragStartCoord) * getSpinDirection()
  currentFrameFloat = normalizeFrameIndex(dragStartFrame + delta / DRAG_SENSITIVITY, total)
  currentFrame = Math.floor(currentFrameFloat)
  lastDragPositions.push({ coord: pointerCoord, time: performance.now() })
  if (lastDragPositions.length > VELOCITY_SAMPLES) lastDragPositions.shift()
}

const handlePointerUp = (e: PointerEvent) => {
  if (!isDragging) return
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

  const imageBaseUrl = host.getAttribute('data-image-base-url')
  const imageCount = parseInt(host.getAttribute('data-image-count') || '0', 10)
  const imageNumberPadding = parseInt(host.getAttribute('data-image-number-padding') || '4', 10)

  options.axis = host.getAttribute('data-axis') === 'y' ? 'y' : 'x'
  options.direction = host.getAttribute('data-direction') === '-1' ? -1 : 1
  options.draggable = host.getAttribute('data-draggable') !== 'false'
  options.initialSpin = host.getAttribute('data-initial-spin') !== 'false'
  options.spinOffset = parseInt(host.getAttribute('data-spin-offset') || '0', 10)
  options.initialFrame = parseInt(host.getAttribute('data-initial-frame') || '1', 10)
  options.frameInterval = 60
  options.replacementToken = host.getAttribute('data-replacement-token') || 'frame'

  if (imageBaseUrl && imageCount > 0) {
    options.images = buildImagesFromTemplate(imageBaseUrl, imageCount, imageNumberPadding)
  }

  currentFrame = options.initialSpin ? getStartFrameFromSpinOffset() : 0
  currentFrameFloat = currentFrame
  preloadImagesProgressive()
  return () => {
    if (spinInterval) clearInterval(spinInterval)
    stopMomentum()
  }
})

$: currentSrc = options.images?.[currentFrame] || ''
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
  {:else}
    <p>Loading...</p>
  {/if}
</div>