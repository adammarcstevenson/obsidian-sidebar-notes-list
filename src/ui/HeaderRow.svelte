<script lang="ts">
  import { Platform } from 'obsidian'
  import ObsidianIcon from './ObsidianIcon.svelte'

  type Props = {
    timestamp: string,
    pinned: boolean
  }

  let {
    timestamp,
    pinned
  }: Props = $props()
  
  let container: HTMLElement
  export const getBoundingClientRect = () => {
    return container.getBoundingClientRect()
  }
  export const scrollIntoView = () => {
    container.scrollIntoView(true)
  }
  
  let styleTop = $state('0px')
  export const updateStyleTop = (str: string) => { styleTop = str }
</script>

<div
  bind:this={container}
  class="row-header-container"
  style:top={styleTop}
>
  <div
    class="row-header"
    class:mobile={Platform.isMobile || Platform.isTablet}
  >
    {#if pinned}
      <ObsidianIcon
        iconId="pin"
        size="xs"
      />
    {/if}
    <span class="row-header-text">
      {timestamp}
    </span>
  </div>
</div>

<style lang="scss">
  @use './global.scss' as *;

  .row-header-container {
    position: sticky;
    z-index: 1;
  }
  .row-header {
    display: flex;
    align-items: center;
    padding: var(--nav-item-padding);
    padding-top: var(--size-2-3);
    border-bottom: $border-style;
    border-radius: 0;
    background-color: var(--background-secondary);
    color: var(--text-faint);
    font-weight: var(--font-bold);
    font-size: var(--nav-item-size);
    line-height: var(--line-height-tight);
  }
  :global(.theme-light) .row-header.mobile {
    background-color: var(--background-primary);
  }
</style>