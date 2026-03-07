<script lang="ts">
  import SpinViewer from './lib/components/TenuukiSpinViewer.svelte';

  const imageCount = 60;
  const images = Array.from({ length: imageCount }, (_, i) => `/spinner_frames_horizontal_box/box-${String(i+1).padStart(4, '0')}.webp`);
</script>

<main>
  <h1>Tenuuki Spin</h1>
  <div class="card tenuuki-spin-viewer-card">
    <SpinViewer options={{ 
      images, 
      initialSpin: true, 
      spinOffset: 180, 
      initialFrame: 20,
      direction: -1
       }}/>
  </div>
</main>

<style>
.card {
  padding: 1em;
  border-radius: 0.5em;
  background-color: #f0f0f0;
}

.tenuuki-spin-viewer-card {
  width: 300px;
  height: 300px;
  background: url('./bamboo.webp') no-repeat center center;
  background-size: cover;
}
</style>
