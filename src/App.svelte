<script lang="ts">
  import SpinViewer from './lib/components/TenuukiSpinViewer.svelte';

  const baseUrl = (import.meta.env.VITE_BASE_URL || import.meta.env.BASE_URL || '/')
    .replace(/\/?$/, '/');

  const imageCount = 60;
  const images = Array.from(
    { length: imageCount },
    (_, i) =>
      `${baseUrl}spinner_frames_vertical_box/box-${String(i + 1).padStart(4, '0')}.webp`
  );
  const horzImages = Array.from(
    { length: 60 },
    (_, i) =>
      `${baseUrl}spinner_frames_horizontal_box/box-${String(i + 1).padStart(4, '0')}.webp`
  );
</script>

<main>
  <h1>Tenuuki Spin</h1>
  <div class="card">
    <div class="row">
      <div class="col">
        <div
          class="tenuuki-spin-viewer-card"
        >
          <!-- <SpinViewer options={{ 
            images, 
            initialSpin: true, 
            spinOffset: 180, 
            initialFrame: 20,
            axis: 'y',
            initialSpinDirection: -1,
            direction: -1
          }}/> -->


        <tenuuki-spin-viewer
          id="viewer"
          data-image-base-url={`./spinner_frames_vertical_box/box-{frame}.webp`}
          data-image-count="60"
          data-image-number-padding="4"
          data-axis="x"
          data-direction="-1"
          data-draggable="true"
          data-initial-spin="true"
          data-spin-offset="180"
        ></tenuuki-spin-viewer>


        <div class="code-block card">
          <code>
            {`<tenuuki-spin-viewer options={{ 
              images, 
              initialSpin: true, 
              spinOffset: 180, 
              initialFrame: 20,
              axis: 'y',
              initialSpinDirection: -1,
              direction: -1
            }}></tenuuki-spin-viewer>
`}
          </code>
        </div>
        </div>
    </div>
    <div class="col">
      <div
        class="tenuuki-spin-viewer-card"
      >
<!--       
        <SpinViewer options={{ 
          images: horzImages, 
          initialSpin: true, 
          spinOffset: 180, 
          initialFrame: 20,
          axis: 'x',
          initialSpinDirection: 1,
          direction: -1
        }}/> -->

        <tenuuki-spin-viewer
          id="viewer"
          data-image-base-url={`./spinner_frames_horizontal_box/box-{frame}.webp`}
          data-image-count="60"
          data-image-number-padding="4"
          data-axis="y"
          data-direction="-1"
          data-draggable="true"
          data-initial-spin="true"
          data-spin-offset="180"
        ></tenuuki-spin-viewer>
        <div class="code-block card">
          <code>
            {`<tenuuki-spin-viewer options={{ 
              images: horzImages, 
              initialSpin: true, 
              spinOffset: 180, 
              initialFrame: 20,
              axis: 'x',
              initialSpinDirection: 1,
              direction: -1
            }}></tenuuki-spin-viewer>`}
          </code>
        </div>
      </div>
  </div>
</main>

<style>
.tenuuki-spin-viewer-card {
  width: 300px;
  height: 300px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.code-block {
  box-shadow: 0 10px 10px rgba(0,0,0,0.2);
}
</style>
