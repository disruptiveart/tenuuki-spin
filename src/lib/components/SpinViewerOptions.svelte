<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import type { TenuukiSpinViewerOptions } from '$lib/types/TenuukiSpinViewerOptions'

  export let options: TenuukiSpinViewerOptions

  const dispatch = createEventDispatcher()

  const finalOptions: any = {
    imageBaseUrl: './spinner_frames_vertical_box/box-{frame}.webp',
    imageCount: 60,
    imageNumberPadding: 4,
    axis: 'x',
  }

  const handleChange = () => {
    dispatch('change', finalOptions)
  }
</script>

<div class="spin-viewer-options">
  <h2>Options</h2>
  <div class="option-group">
    <label for="images" class="form-label">Image Base URL</label>
    <input
      id="images"
      type="text"
      class="form-control"
      bind:value={finalOptions.imageBaseUrl}
      on:change={handleChange}
    />
  </div>
  <div class="option-group">
    <label for="imageCount" class="form-label">Image Count</label>
    <input
      id="imageCount"
      type="number"
      class="form-control"
      bind:value={finalOptions.imageCount}
      on:change={handleChange}
    />
  </div>
  <div class="option-group">
    <label for="imageNumberPadding" class="form-label">Image Number Padding</label>
    <input
      id="imageNumberPadding"
      type="number"
      class="form-control"
      bind:value={finalOptions.imageNumberPadding}
      on:change={handleChange}
    />
  </div>
  <div class="option-group">
    <label for="axis" class="form-label">Axis</label>
    <input
      id="axis"
      type="text"
      class="form-control"
      bind:value={finalOptions.axis}
      on:change={handleChange}
    />
  </div>
</div>