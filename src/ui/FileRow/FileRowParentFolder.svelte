<script lang="ts">
  import ObsidianIcon from '../ObsidianIcon.svelte'
  import state from '../../state'
  const { file } = $props()
  const { settings } = state
  const fileParentText = file.tfile.parent!.isRoot() ? '(Vault folder)' : file.tfile.parent!.name
</script>

{#if settings.showParentFolder}
  <div class="file-parent">
    <ObsidianIcon
      iconId="folder-closed"
      size="xs"
    />
    <div class="file-parent-text">{fileParentText}</div>
  </div>
{/if}

<style lang="scss">
  @use '../global.scss' as *;

  .file-parent {
    display: flex;
    align-items: center;
    margin-top: var(--size-2-3);
    color: var(--text-muted);
  }
  .file-parent-text {
    @include text-overflow-styles;
    margin-left: var(--size-2-1);
  }
</style>