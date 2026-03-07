<script lang="ts">
import { onMount } from 'svelte'
import '../styles/spin-viewer.scss'
import type { TenuukiSpinViewerOptions } from '$lib/types/TenuukiSpinViewerOptions'

export let options: TenuukiSpinViewerOptions
let currentFrame = 0
let imgElement: HTMLImageElement
const preloadedImages: HTMLImageElement[] = []
const loadedFlags: boolean[] = []
let loadedCount = 0
let spinStarted = false
let spinInterval: ReturnType<typeof setInterval> | undefined

// Drag / throw physics
let isDragging = false
let dragStartX = 0
let dragStartFrame = 0
let lastDragTime = 0
let lastDragX = 0
let velocity = 0
const DRAG_SENSITIVITY = 2
const DECAY = 0.95
const MIN_VELOCITY = 0.1

const normalizeFrameIndex = (idx: number, total: number) => ((idx % total) + total) % total

// --- INITIAL SPIN HELPERS ---
const getInitialFrameIndex = () => {
  const total = options?.images?.length ?? 0
  if (total <= 0) return 0
  const initial = options?.initialFrame ?? 1
  return Math.min(total - 1, Math.max(0, initial - 1))
}

const getOffsetFramesFromSpinOffset = () => {
  const total = options?.images?.length ?? 0
  if (total <= 1) return 0
  const normalizedDegrees = ((options?.spinOffset ?? 0) % 360 + 360) % 360
  return Math.round((normalizedDegrees / 360) * total)
}

const getStartFrameFromSpinOffset = () => {
  const total = options?.images?.length ?? 0
  if (total <= 1) return getInitialFrameIndex()
  const targetFrame = getInitialFrameIndex()
  const offsetFrames = getOffsetFramesFromSpinOffset()
  return normalizeFrameIndex(targetFrame - offsetFrames, total)
}

const beginInitialSpinForwardToInitialFrame = () => {
  if (!options?.initialSpin) return
  if (spinInterval) clearInterval(spinInterval)

  const total = options.images.length
  const startFrame = getStartFrameFromSpinOffset()
  const targetFrame = getInitialFrameIndex()
  currentFrame = startFrame

  if (startFrame === targetFrame) return

  spinInterval = setInterval(() => {
    currentFrame = (currentFrame + 1) % total
    if (currentFrame === targetFrame) {
      if (spinInterval) clearInterval(spinInterval)
      spinInterval = undefined
      spinStarted = true
    }
  }, 60)
}

// --- IMAGE PRELOADING ---
const preloadImagesProgressive = (chunkSize = 10, delay = 50) => {
  let index = 0
  const markLoaded = (i: number) => {
    if (!loadedFlags[i]) {
      loadedFlags[i] = true
      loadedCount += 1
      maybeBeginSpin()
    }
  }

  const loadChunk = () => {
    for (let i = index; i < index + chunkSize && i < options.images.length; i++) {
      const img = new Image()
      loadedFlags[i] = false
      img.onload = () => markLoaded(i)
      img.onerror = () => markLoaded(i)
      img.src = options.images[i]
      preloadedImages[i] = img
    }
    index += chunkSize
    if (index < options.images.length) setTimeout(loadChunk, delay)
  }
  loadChunk()
}

const maybeBeginSpin = () => {
  if (!spinStarted && options?.initialSpin) beginInitialSpinForwardToInitialFrame()
}

// --- DRAG & THROW ---
const handlePointerDown = (e: PointerEvent) => {
  isDragging = true
  dragStartX = e.clientX
  dragStartFrame = currentFrame
  lastDragX = e.clientX
  lastDragTime = e.timeStamp
  velocity = 0

  if (spinInterval) { clearInterval(spinInterval); spinInterval = undefined }

  if (imgElement) imgElement.setPointerCapture(e.pointerId)
}

const handlePointerMove = (e: PointerEvent) => {
  if (!isDragging) return
  const total = options?.images?.length ?? 0
  if (total === 0) return

  const deltaX = e.clientX - dragStartX
  const frameDelta = deltaX / DRAG_SENSITIVITY
  currentFrame = normalizeFrameIndex(dragStartFrame + Math.round(frameDelta), total)

  const dt = e.timeStamp - lastDragTime
  if (dt > 0) velocity = (e.clientX - lastDragX) / dt * 16.67
  lastDragX = e.clientX
  lastDragTime = e.timeStamp
}

const handlePointerUp = (e: PointerEvent) => {
  if (!isDragging) return
  isDragging = false
  if (imgElement) imgElement.releasePointerCapture(e.pointerId)
  requestAnimationFrame(applyThrow)
}

const applyThrow = () => {
  const total = options?.images?.length ?? 0
  if (total <= 0) return
  if (Math.abs(velocity) < MIN_VELOCITY) return

  currentFrame = normalizeFrameIndex(currentFrame + Math.round(velocity), total)
  velocity *= DECAY
  requestAnimationFrame(applyThrow)
}

onMount(() => {
  if (!options?.images || options.images.length === 0) return
  currentFrame = options.initialSpin ? getStartFrameFromSpinOffset() : getInitialFrameIndex()
  preloadImagesProgressive()
})

$: currentSrc = options?.images?.[currentFrame] || ''
</script>

<div class="tenuuki-spin-viewer">
  {#if currentSrc}
    <img
      bind:this={imgElement}
      src={currentSrc}
      alt="Spinner frame {currentFrame}"
      draggable="false"
      on:pointerdown={handlePointerDown}
      on:pointermove={handlePointerMove}
      on:pointerup={handlePointerUp}
      on:pointercancel={handlePointerUp}
      style="
        cursor: {isDragging ? 'grabbing' : 'grab'};
        user-select: none;
        touch-action: none;
      "
    />
  {:else}
    <p>Loading...</p>
  {/if}
</div>