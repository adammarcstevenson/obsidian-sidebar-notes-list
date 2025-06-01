<script lang="ts">
  import { getIcon } from 'obsidian'
  import { onMount } from 'svelte'

  type Props = {
    iconId: string,
    size?: string|null
  }

  let {
    iconId,
    size = null
  }: Props = $props()

  let container: HTMLDivElement

  onMount(() => {
    container.append(getIcon(iconId) as Node)
  })
</script>

<div
  bind:this={container}
  class="container"
  class:xs={size === 'xs'}
></div>

<style lang="scss">
  .container {
    display: flex;
    align-items: center;
  }
  .container.xs > :global(svg) {
    height: var(--icon-xs);
  }
</style>