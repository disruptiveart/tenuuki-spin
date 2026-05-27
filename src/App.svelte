<script lang="ts">
  import { onMount } from 'svelte'

  type FrameChangePayload = {
    image_name: string
    index: number
    angle: number
  }

  type SpinViewerElement = HTMLElement & {
    play: (times?: number) => void
    stop: () => void
    replay: (rotations?: number, i?: number | null) => void
    goTo: (i: number) => void
    spinTo: (i: number, rotations?: number, shortestPath?: boolean) => void
    onFrameChange?: (payload: FrameChangePayload) => void
  }

  const baseUrl = (import.meta.env.VITE_BASE_URL || import.meta.env.BASE_URL || '/').replace(/\/?$/, '/')
  const verticalTemplate = `${baseUrl}spinner_frames_vertical_box/box-{i}.webp`
  const horizontalTemplate = `${baseUrl}spinner_frames_horizontal_box/box-{frame}.webp`

  let viewerVertical: SpinViewerElement | null = null
  let playRotations = 1
  let frameInput = 0
  let spinToFrameInput = 0
  let spinToShortestPath = true
  let currentFrameData: FrameChangePayload = { image_name: '', index: 0, angle: 0 }

  const handleFrameChange = (payload: FrameChangePayload) => {
    currentFrameData = payload
  }

  onMount(() => {
    if (!viewerVertical) return
    viewerVertical.onFrameChange = handleFrameChange
    return () => {
      if (viewerVertical) viewerVertical.onFrameChange = undefined
    }
  })

  const onReplay = () => viewerVertical?.replay(playRotations)
  const onGoTo = () => viewerVertical?.goTo(frameInput)
  const onStop = () => viewerVertical?.stop()
  const onPlay = () => viewerVertical?.play(playRotations)
  const onSpinTo = () => viewerVertical?.spinTo(spinToFrameInput, 2, spinToShortestPath)
</script>

<main class="demo-wrap">
  <h1>Tenuuki Spin</h1>
  <p class="hint">Everything is now wired in <strong>App.svelte</strong>, including frame change callbacks.</p>

  <div class="viewer-grid">
    <tenuuki-spin-viewer
      bind:this={viewerVertical}
      class="viewer"
      data-image-base-url={verticalTemplate}
      data-image-count="60"
      data-image-number-padding="4"
      data-replacement-token="i"
      data-axis="y"
      data-direction="-1"
      data-initial-spin-direction="-1"
      data-draggable="true"
      data-initial-spin="true"
      data-spin-offset="180"
      data-speed-multiplier="1.5"
      data-easing="easeOutBounce"
      data-easing-scope="single"
      on:framechange={(event: CustomEvent<FrameChangePayload>) => handleFrameChange(event.detail)}
    ></tenuuki-spin-viewer>

    <tenuuki-spin-viewer
      class="viewer"
      data-image-base-url={horizontalTemplate}
      data-image-count="60"
      data-image-number-padding="4"
      data-axis="x"
      data-direction="-1"
      data-initial-spin-direction="1"
      data-draggable="true"
      data-initial-spin="true"
      data-initial-frame="20"
      data-spin-offset="180"
      data-speed-multiplier="0.9"
      data-easing="easeInOutSine"
      data-easing-scope="single"
    ></tenuuki-spin-viewer>

    <tenuuki-spin-viewer
      class="viewer viewer-large"
      data-axis="x"
      data-direction="1"
      data-draggable="true"
      data-initial-spin="true"
      data-initial-frame="4"
      data-initial-spin-direction="-1"
      data-image-base-url={'https://sailuntire.ca/360/AT2/SAILUN-TERRAMAX-AT2-{i}.webp'}
      data-image-count="48"
      data-image-number-padding="0"
      data-replacement-token="i"
      data-spin-offset="360"
      data-speed-multiplier="1.5"
      data-easing-scope="full"
    ></tenuuki-spin-viewer>
  </div>

  <div class="controls">
    <button on:click={onPlay}>Play</button>
    <button on:click={onStop}>Stop</button>
    <button on:click={onReplay}>Replay</button>

    <label>
      Rotations
      <input type="number" bind:value={playRotations} min="1" />
    </label>

    <label>
      Go To Frame
      <input type="number" bind:value={frameInput} min="0" />
      <button on:click={onGoTo}>Go</button>
    </label>

    <label>
      Spin To Frame
      <input type="number" bind:value={spinToFrameInput} min="0" />
      <button on:click={onSpinTo}>Spin</button>
    </label>

    <label class="check-row">
      <input type="checkbox" bind:checked={spinToShortestPath} />
      Shortest Path
    </label>
  </div>

  <pre class="frame-data">{JSON.stringify(currentFrameData, null, 2)}</pre>
</main>

<style>
  .demo-wrap {
    text-align: left;
  }

  .hint {
    margin-top: 0;
    opacity: 0.8;
  }

  .viewer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 16px;
    margin: 16px 0;
  }

  .viewer {
    display: block;
    width: 300px;
    height: 300px;
  }

  .viewer-large {
    width: 600px;
    height: 600px;
    max-width: 100%;
  }

  .controls {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
    margin: 16px 0;
  }

  label {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  input[type='number'] {
    width: 96px;
  }

  .check-row {
    gap: 6px;
  }

  .frame-data {
    background: rgba(127, 127, 127, 0.1);
    padding: 12px;
    border-radius: 8px;
    overflow: auto;
  }
</style>
