<svelte:options customElement="tenuuki-spin-viewer" />

<script lang="ts">
import { onMount } from 'svelte'
import '../styles/spin-viewer.scss'
import type { TenuukiSpinViewerOptions } from '$lib/types/TenuukiSpinViewerOptions'

export let options: TenuukiSpinViewerOptions

// ----- Spinner state -----
let currentFrame = 0
let currentFrameFloat = 0
let frameInterval: number = 60
let imgElement: HTMLImageElement
let spinInterval: ReturnType<typeof setInterval> | undefined

// ----- Preload -----
const preloadedImages: HTMLImageElement[] = []
const loadedFlags: boolean[] = []
let loadedCount = 0
let spinStarted = false

// ----- Drag / Momentum -----
let isDragging = false
let dragStartX = 0
let dragStartFrame = 0
const DRAG_SENSITIVITY = 2

let velocity = 0
let lastDragPositions: Array<{ x: number; time: number }> = []
let momentumId: number | undefined
const MOMENTUM_FRICTION = 0.92
const VELOCITY_SAMPLES = 5

// ----- Spin direction -----
// 1 = normal (clockwise top-down), -1 = inverted (counter-clockwise)
const getSpinDirection = () => {
    return options?.direction === -1 ? 1 : -1
}

// ----- Utilities -----
const normalizeFrameIndex = (idx: number, total: number) => ((idx % total) + total) % total

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

// ----- Preload images progressively -----
const maybeBeginSpin = () => {
    if (spinStarted || !options?.initialSpin) {
        return;
    }

    const total = options.images.length;
    const startFrame = getStartFrameFromSpinOffset();
    const targetFrame = getInitialFrameIndex();

    let ready = true;

    for (let i = startFrame; i !== (targetFrame + 1) % total; i = (i + 1) % total) {
        if (!isLoaded(i)) { ready = false; break }
    }

    if (ready) {
        spinStarted = true;
        beginInitialSpinForwardToInitialFrame();
    }
}

const beginInitialSpinForwardToInitialFrame = () => {
    if (!options?.initialSpin) {
        return;
    }

    if (spinInterval) {
        clearInterval(spinInterval);
        spinInterval = undefined;
    }

    const total = options.images.length;
    const startFrame = getStartFrameFromSpinOffset();
    const targetFrame = getInitialFrameIndex()
    currentFrame = startFrame;
    currentFrameFloat = startFrame;

    if (startFrame === targetFrame) {
        return;
    }

    spinInterval = setInterval(() => {
        if (currentFrame === targetFrame) {
            clearInterval(spinInterval);
            spinInterval = undefined;
            return;
        }

        currentFrame = (currentFrame + 1) % total;
        currentFrameFloat = currentFrame;
    }, options?.frameInterval ?? frameInterval);
}

const preloadImagesProgressive = (chunkSize = 10, delay = 50) => {
    let index = 0;

    const markLoaded = (i: number) => {
        if (!loadedFlags[i]) {
            loadedFlags[i] = true;
            loadedCount++;
            maybeBeginSpin();
        }
    }

    const loadChunk = () => {
        for (let i = index; i < index + chunkSize && i < options.images.length; i++) {
            const img = new Image();
            loadedFlags[i] = false;
            img.onload = () => markLoaded(i);
            img.onerror = () => { console.warn(`[TenuukiSpinViewer] Failed to load image ${i}`); markLoaded(i); }
            img.src = options.images[i];
            preloadedImages[i] = img;
        }
        index += chunkSize;
        if (index < options.images.length) setTimeout(loadChunk, delay);
    }

    loadChunk()
}

// ----- Momentum -----
const stopMomentum = () => {
    if (momentumId) {
        cancelAnimationFrame(momentumId);
    }

    momentumId = undefined;
    velocity = 0;
}

const startMomentum = () => {
    const total = options?.images?.length ?? 0
    if (total === 0 || Math.abs(velocity) < 0.1) return

    let lastTime = performance.now()

    const step = (time: number) => {
        const dt = (time - lastTime) / 1000
        lastTime = time

        currentFrameFloat = normalizeFrameIndex(currentFrameFloat + velocity * dt, total)
        currentFrame = Math.floor(currentFrameFloat)

        velocity *= Math.pow(MOMENTUM_FRICTION, dt * 60)

        if (Math.abs(velocity) >= 0.01) {
            momentumId = requestAnimationFrame(step)
        } else {
            momentumId = undefined
            velocity = 0
        }
    }

    momentumId = requestAnimationFrame(step)
}

// ----- Pointer events -----
const handlePointerDown = (e: PointerEvent) => {
    if (options.draggable === false) {
        return;
    }
    
    isDragging = true
    dragStartX = e.clientX
    dragStartFrame = currentFrameFloat
    lastDragPositions = [{ x: e.clientX, time: performance.now() }]

    if (spinInterval) { 
        clearInterval(spinInterval); 
        spinInterval = undefined;
}

    stopMomentum()

    if (imgElement) {
        imgElement.setPointerCapture(e.pointerId);
    }

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
}

const handlePointerMove = (e: PointerEvent) => {
    if (options.draggable === false) {
        return;
    }
    
    if (!isDragging) { 
        return;
    }

    const total = options?.images?.length ?? 0;

    if (total <= 0) {
        return;
    }

    const direction = getSpinDirection()
    const deltaX = (e.clientX - dragStartX) * direction
    currentFrameFloat = normalizeFrameIndex(dragStartFrame + deltaX / DRAG_SENSITIVITY, total)
    currentFrame = Math.floor(currentFrameFloat)

    const now = performance.now()
    lastDragPositions.push({ x: e.clientX, time: now })
    if (lastDragPositions.length > VELOCITY_SAMPLES) lastDragPositions.shift()
}

const handlePointerUp = (e: PointerEvent) => {
    if (options.draggable === false) {
        return;
    }

    if (!isDragging) {
        return;
    }

    isDragging = false

    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerup', handlePointerUp)
    window.removeEventListener('pointercancel', handlePointerUp)

    if (imgElement) imgElement.releasePointerCapture(e.pointerId)

    if (lastDragPositions.length >= 2) {
        const first = lastDragPositions[0]
        const last = lastDragPositions[lastDragPositions.length - 1]
        const dt = (last.time - first.time) / 1000
        const dx = last.x - first.x
        if (dt > 0) {
            const direction = getSpinDirection()
            velocity = (dx / DRAG_SENSITIVITY / dt) * direction
            if (Math.abs(velocity) > 0.1) startMomentum()
        }
    }

    lastDragPositions = []
}

// ----- Lifecycle -----
onMount(() => {
    if (!options || !options.images || options.images.length === 0) {
        console.warn('TenuukiSpinViewer: No images provided')
        return
    }

    currentFrame = options.initialSpin ? getStartFrameFromSpinOffset() : getInitialFrameIndex()
    currentFrameFloat = currentFrame

    preloadImagesProgressive()

    return () => {
        if (spinInterval) clearInterval(spinInterval)
        stopMomentum()
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