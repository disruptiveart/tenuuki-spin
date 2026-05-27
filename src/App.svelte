<script lang="ts">
  import DemoSpinner from './lib/components/DemoSpinner.svelte'

  const baseUrl = (import.meta.env.VITE_BASE_URL || import.meta.env.BASE_URL || '/').replace(/\/?$/, '/')
  const verticalTemplate = `${baseUrl}spinner_frames_vertical_box/box-{i}.webp`
  const horizontalTemplate = `${baseUrl}spinner_frames_horizontal_box/box-{frame}.webp`
</script>

<main class="demo-wrap">
  <h1>Tenuuki Spin</h1>
  <p class="hint">Reusable <strong>DemoSpinner</strong> components now power all three demos.</p>

  <div class="viewer-grid">
    <DemoSpinner
      title="Vertical Spinner"
      viewerId="viewer-vertical"
      imageBaseUrl={verticalTemplate}
      imageCount={60}
      imageNumberPadding="4"
      replacementToken="i"
      axis="y"
      direction={-1}
      initialSpinDirection={-1}
      draggable={true}
      initialSpin={true}
      initialFrame={1}
      spinOffset={180}
      speedMultiplier={1.5}
      easing="easeOutBounce"
      easingScope="single"
      width={300}
      height={300}
    />

    <DemoSpinner
      title="Horizontal Spinner"
      viewerId="viewer-horizontal"
      imageBaseUrl={horizontalTemplate}
      imageCount={60}
      imageNumberPadding="4"
      replacementToken="frame"
      axis="x"
      direction={-1}
      initialSpinDirection={1}
      draggable={true}
      initialSpin={true}
      initialFrame={20}
      spinOffset={180}
      speedMultiplier={0.9}
      easing="easeInOutSine"
      easingScope="single"
      width={300}
      height={300}
    />
  </div>
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
    grid-template-columns: 1fr;
    gap: 16px;
    margin: 16px 0;
  }
</style>
