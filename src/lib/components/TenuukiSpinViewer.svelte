<svelte:options customElement="tenuuki-spin-viewer" />

<script lang="ts">
import { onMount } from 'svelte'
import '../styles/spin-viewer.scss'
import type { TenuukiSpinViewerOptions } from '$lib/types/TenuukiSpinViewerOptions'

export let options: TenuukiSpinViewerOptions
let currentFrame = 0
let frameInterval: number = 60
let imgElement: HTMLImageElement
let spinInterval: ReturnType<typeof setInterval> | undefined
const preloadedImages: HTMLImageElement[] = []
const loadedFlags: boolean[] = []
let loadedCount = 0
let spinStarted = false

let isDragging = false
let dragStartX = 0
let dragStartFrame = 0
const DRAG_SENSITIVITY = 2 // pixels per frame

const normalizeFrameIndex = (idx: number, total: number) => {
  if (total <= 0) return 0
  return ((idx % total) + total) % total
}

const getInitialFrameIndex = () => {
  const total = options?.images?.length ?? 0
  if (total <= 0) return 0

  const initial = options?.initialFrame ?? 1
  return Math.min(total - 1, Math.max(0, initial - 1))
}

const getOffsetFramesFromSpinOffset = () => {
  const total = options?.images?.length ?? 0
  if (total <= 1) return 0

  const rawDegrees = options?.spinOffset ?? 0
  const normalizedDegrees = ((rawDegrees % 360) + 360) % 360
  return Math.round((normalizedDegrees / 360) * total)
}

const getStartFrameFromSpinOffset = () => {
  const total = options?.images?.length ?? 0
  if (total <= 1) return getInitialFrameIndex()

  const targetFrame = getInitialFrameIndex()
  const offsetFrames = getOffsetFramesFromSpinOffset()

  return normalizeFrameIndex(targetFrame - offsetFrames, total)
}

const isLoaded = (i: number) => !!loadedFlags[i]

const areFramesLoadedForForwardPath = (startFrame: number, targetFrame: number) => {
  const total = options?.images?.length ?? 0
  if (total === 0) return false

  if (startFrame <= targetFrame) {
    for (let i = startFrame; i <= targetFrame; i++) {
      if (!isLoaded(i)) return false
    }
    return true
  }

  for (let i = startFrame; i < total; i++) {
    if (!isLoaded(i)) return false
  }
  for (let i = 0; i <= targetFrame; i++) {
    if (!isLoaded(i)) return false
  }
  return true
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
    if (currentFrame === targetFrame) {
      if (spinInterval) clearInterval(spinInterval)
      spinInterval = undefined
      return
    }

    currentFrame = (currentFrame + 1) % total
  }, frameInterval)
}

const maybeBeginSpin = () => {
  if (spinStarted || !options?.initialSpin) return

  const startFrame = getStartFrameFromSpinOffset()
  const targetFrame = getInitialFrameIndex()

  if (areFramesLoadedForForwardPath(startFrame, targetFrame)) {
    spinStarted = true
    beginInitialSpinForwardToInitialFrame()
  }
}

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
      img.onerror = () => {
        console.warn(`[TenuukiSpinViewer]: Failed to load image at index ${i}`)
        markLoaded(i)
      }

      img.src = options.images[i]
      preloadedImages[i] = img
    }

    index += chunkSize
    if (index < options.images.length) setTimeout(loadChunk, delay)
  }

  loadChunk()
}

const handlePointerDown = (e: PointerEvent) => {
  isDragging = true
  dragStartX = e.clientX
  dragStartFrame = currentFrame

  // Stop any ongoing intro spin
  if (spinInterval) {
    clearInterval(spinInterval)
    spinInterval = undefined
  }

  if (imgElement) {
    imgElement.setPointerCapture(e.pointerId)
  }
}

const handlePointerMove = (e: PointerEvent) => {
  if (!isDragging) return

  const total = options?.images?.length ?? 0
  if (total === 0) return

  const deltaX = e.clientX - dragStartX
  const frameDelta = Math.round(deltaX / DRAG_SENSITIVITY)

  currentFrame = normalizeFrameIndex(dragStartFrame + frameDelta, total)
}

const handlePointerUp = (e: PointerEvent) => {
  isDragging = false

  if (imgElement) {
    imgElement.releasePointerCapture(e.pointerId)
  }
}

onMount(() => {
  if (!options || !options.images || options.images.length === 0) {
    console.warn('TenuukiSpinViewer: No images provided in options')
    return
  }

  currentFrame = options.initialSpin ? getStartFrameFromSpinOffset() : getInitialFrameIndex()

  preloadImagesProgressive()

  return () => {
    if (spinInterval) clearInterval(spinInterval)
  }
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
        " />
  {:else}
    <p>Loading...</p>
  {/if}
</div>