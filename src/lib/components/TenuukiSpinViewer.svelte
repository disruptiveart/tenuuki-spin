<svelte:options customElement="tenuuki-spin-viewer" />

<script lang="ts">
import { onMount } from 'svelte'
import '../styles/spin-viewer.scss'
import type { TenuukiSpinViewerOptions } from '$lib/types/TenuukiSpinViewerOptions'

export let options: TenuukiSpinViewerOptions
let currentFrame = 0
let frameInterval: number = 100
let imgElement: HTMLImageElement

$: currentSrc = options?.images?.[currentFrame] || ''

onMount(() => {
  console.log('TenuukiSpinViewer mounted with options:', options)

  if (!options || !options.images || options.images.length === 0) {
    console.warn('TenuukiSpinViewer: No images provided in options')
    return
  }

  const interval = setInterval(() => {
    currentFrame = (currentFrame + 1) % options.images.length
  }, frameInterval)

  return () => clearInterval(interval)
})
</script>

<div class="tenuuki-spin-viewer">
  {#if currentSrc}
    <img bind:this={imgElement} src={currentSrc} alt="Spinner frame {currentFrame}" />
  {:else}
    <p>Loading...</p>
  {/if}
</div>