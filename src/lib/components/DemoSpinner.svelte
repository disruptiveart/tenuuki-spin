<script lang="ts">
  import { onMount } from 'svelte'

  type FrameChangePayload = {
    image_name: string
    index: number
    angle: number
    id?: string
    ref?: HTMLElement
  }

  type SpinViewerElement = HTMLElement & {
    play: (times?: number) => void
    stop: () => void
    replay: (rotations?: number, i?: number | null) => void
    goTo: (i: number) => void
    spinTo: (i: number, rotations?: number, shortestPath?: boolean) => void
    onFrameChange?: (payload: FrameChangePayload) => void
  }

  export let title = 'Spinner'
  export let viewerId = ''
  export let width = 300
  export let height = 300
  export let imageBaseUrl = ''
  export let imageCount = 60
  export let imageNumberPadding = ''
  export let replacementToken = 'frame'
  export let axis: 'x' | 'y' = 'x'
  export let direction: 1 | -1 = 1
  export let initialSpinDirection: 1 | -1 | undefined = undefined
  export let draggable = true
  export let initialSpin = true
  export let initialFrame = 1
  export let spinOffset = 0
  export let speedMultiplier = 1
  export let easing = 'linear'
  export let easingScope: 'single' | 'full' = 'single'

  let viewerEl: SpinViewerElement | null = null
  let playRotations = 1
  let frameInput = 0
  let spinToFrameInput = 0
  let spinToShortestPath = true
  let currentFrameData: FrameChangePayload = { image_name: '', index: 0, angle: 0 }
  let viewerConfigKey = ''

  const handleFrameChange = (payload: FrameChangePayload) => {
    currentFrameData = payload
  }

  $: viewerConfigKey = [
    viewerId,
    width,
    height,
    imageBaseUrl,
    imageCount,
    imageNumberPadding,
    replacementToken,
    axis,
    direction,
    initialSpinDirection,
    draggable,
    initialSpin,
    initialFrame,
    spinOffset,
    speedMultiplier,
    easing,
    easingScope
  ].join('|')

  $: if (viewerEl) {
    viewerEl.onFrameChange = handleFrameChange
  }

  onMount(() => {
    if (!viewerEl) return
    viewerEl.onFrameChange = handleFrameChange
    return () => {
      if (viewerEl) viewerEl.onFrameChange = undefined
    }
  })

  const onReplay = () => viewerEl?.replay(playRotations)
  const onGoTo = () => viewerEl?.goTo(frameInput)
  const onStop = () => viewerEl?.stop()
  const onPlay = () => viewerEl?.play(playRotations)
  const onSpinTo = () => viewerEl?.spinTo(spinToFrameInput, 2, spinToShortestPath)
</script>

<section class="demo-spinner">
  <h3>{title}</h3>
  {#key viewerConfigKey}
    <tenuuki-spin-viewer
      bind:this={viewerEl}
      id={viewerId || undefined}
      style={`display:block;width:${width}px;height:${height}px;max-width:100%;`}
      data-image-base-url={imageBaseUrl}
      data-image-count={String(imageCount)}
      data-image-number-padding={imageNumberPadding}
      data-replacement-token={replacementToken}
      data-axis={axis}
      data-direction={String(direction)}
      data-initial-spin-direction={initialSpinDirection === undefined ? undefined : String(initialSpinDirection)}
      data-draggable={String(draggable)}
      data-initial-spin={String(initialSpin)}
      data-initial-frame={String(initialFrame)}
      data-spin-offset={String(spinOffset)}
      data-speed-multiplier={String(speedMultiplier)}
      data-easing={easing}
      data-easing-scope={easingScope}
      on:framechange={(event: CustomEvent<FrameChangePayload>) => handleFrameChange(event.detail)}
    ></tenuuki-spin-viewer>
  {/key}

  <div class="controls">
    <button on:click={onPlay}>Play</button>
    <button on:click={onStop}>Stop</button>
    <button on:click={onReplay}>Replay</button>

    <label>
      Base URL
      <input type="text" bind:value={imageBaseUrl} />
    </label>

    <label>
      Easing
      <input type="text" bind:value={easing} />
    </label>

    <label>
      Speed
      <input type="number" bind:value={speedMultiplier} step="0.1" min="0.1" />
    </label>

    <label>
      Image Count
      <input type="number" bind:value={imageCount} min="1" />
    </label>

    <label>
      Axis
      <select bind:value={axis}>
        <option value="x">x</option>
        <option value="y">y</option>
      </select>
    </label>

    <label>
      Direction
      <select bind:value={direction}>
        <option value={1}>1</option>
        <option value={-1}>-1</option>
      </select>
    </label>

    <label>
      Initial Spin Direction
      <select
        value={initialSpinDirection === undefined ? '' : String(initialSpinDirection)}
        on:change={(event) => {
          const value = (event.currentTarget as HTMLSelectElement).value
          initialSpinDirection = value === '' ? undefined : (value === '-1' ? -1 : 1)
        }}
      >
        <option value="">inherit</option>
        <option value="1">1</option>
        <option value="-1">-1</option>
      </select>
    </label>

    <label>
      Initial Frame
      <input type="number" bind:value={initialFrame} min="1" />
    </label>

    <label>
      Spin Offset
      <input type="number" bind:value={spinOffset} />
    </label>

    <label>
      Rotations
      <input type="number" bind:value={playRotations} min="1" />
    </label>

    <label>
      Go To
      <input type="number" bind:value={frameInput} min="0" />
      <button on:click={onGoTo}>Go</button>
    </label>

    <label>
      Spin To
      <input type="number" bind:value={spinToFrameInput} min="0" />
      <button on:click={onSpinTo}>Spin</button>
    </label>

    <label>
      Padding
      <input type="text" bind:value={imageNumberPadding} />
    </label>

    <label>
      Token
      <input type="text" bind:value={replacementToken} />
    </label>

    <label>
      Scope
      <select bind:value={easingScope}>
        <option value="single">single</option>
        <option value="full">full</option>
      </select>
    </label>

    <label>
      Width
      <input type="number" bind:value={width} min="1" />
    </label>

    <label>
      Height
      <input type="number" bind:value={height} min="1" />
    </label>

    <label>
      Viewer ID
      <input type="text" bind:value={viewerId} />
    </label>

    <label class="check-row">
      <input type="checkbox" bind:checked={draggable} />
      Draggable
    </label>

    <label class="check-row">
      <input type="checkbox" bind:checked={initialSpin} />
      Initial Spin
    </label>

    <label class="check-row">
      <input type="checkbox" bind:checked={spinToShortestPath} />
      Shortest Path
    </label>
  </div>

  <div class="frame-data">
    <div>image_name: {currentFrameData.image_name}</div>
    <div>index: {currentFrameData.index}</div>
    <div>angle: {currentFrameData.angle.toFixed(2)}</div>
    <div>id: {currentFrameData.id || ''}</div>
    <div>ref: {currentFrameData.ref ? currentFrameData.ref.tagName.toLowerCase() : ''}</div>
  </div>
</section>

<style>
  .demo-spinner {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
    padding: 12px;
    border: 1px solid rgba(127, 127, 127, 0.2);
    border-radius: 10px;
  }

  h3 {
    margin: 0;
    font-size: 1rem;
  }

  .controls {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }

  label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  input[type='number'] {
    width: 84px;
  }

  input[type='text'] {
    min-width: 220px;
  }

  .check-row {
    gap: 4px;
  }

  .frame-data {
    background: rgba(127, 127, 127, 0.1);
    padding: 10px;
    border-radius: 8px;
    width: 100%;
  }
</style>