<script lang="ts">
  import { Platform } from 'obsidian'

  import { FileRowEvents } from './FileRowEvents.svelte';
  import { l10n } from '../../l10n/l10n'
  import ObsidianIcon from '../ObsidianIcon.svelte'
  import state from '../../state'

  let { file } = $props()
  let { settings } = state
  const onPinClick = (event: MouseEvent) => FileRowEvents.onPinClick(event, file)
</script>

{#if settings.pinFiles}
  <div
    class="pin-container"
    class:mobile={Platform.isMobile || Platform.isTablet}
  >
    <button
      aria-label={file.pinned ? l10n('removePinActionLabel') : l10n('pinActionLabel')}
      class="clickable-icon"
      onclick={onPinClick}
    >
      <ObsidianIcon
        iconId={file.pinned ? 'pin-off' : 'pin'}
        size={Platform.isDesktop ? '' : 'xs'}
      />
    </button>
  </div>
{/if}

<style lang="scss">
  .pin-container {
    display: none;
    position: relative;
    right: 0;
    margin-left: var(--size-4-2);
  }
  :global(.row:hover) > .pin-container {
    display: block;
  }
  .pin-container.mobile {
    display: block;
  }
</style>