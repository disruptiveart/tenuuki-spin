<script lang="ts">
  import SpinViewer from './lib/components/TenuukiSpinViewer.svelte';

  const imageCount = 60;
  const images = Array.from({ length: imageCount }, (_, i) => `/spinner_frames/box-${String(i+1).padStart(4, '0')}.png`);
</script>

<main>
  <h1>Tenuuki Spin</h1>
  <div class="card">
    <SpinViewer options={{ images }}/>
  </div>
</main>

<style>
.card {
  padding: 1em;
  border-radius: 0.5em;
  background-color: #f0f0f0;
}
</style>
