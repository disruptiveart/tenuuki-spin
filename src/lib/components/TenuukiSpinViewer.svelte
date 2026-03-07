<svelte:options customElement="tenuuki-spin-viewer" />

<script lang="ts">
import { onMount } from 'svelte'
import '../styles/spin-viewer.scss'
import type { TenuukiSpinViewerOptions } from '$lib/types/TenuukiSpinViewerOptions'

export let options: TenuukiSpinViewerOptions
onMount(() => {
  console.log('TenuukiSpinViewer mounted with options:', options)
})
</script>

<div class="tenuuki-spin-viewer">
  {#each options.images as image}
    <img src={image} alt="Spinner frame" />
  {/each}
</div>