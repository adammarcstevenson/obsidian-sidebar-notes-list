<script lang="ts">
  import { getFileTitleNodes } from '../../utils'
  import state from '../../state'
  import type { TitleFragment } from '../../types'

  let { searchInput } = state
  let { file } = $props()
  let fileTitleFragments: TitleFragment[] = $derived.by(() => {
    if (!searchInput.value) {
      return [{
        text: file.tfile.basename as string,
        highlight: false
      }]
    }
    return getFileTitleNodes(searchInput.value, file.tfile.basename)
  })
</script>


<div class="file-title-container">
  {#snippet titleFragment(text: string, highlight: boolean)}
    <span class:highlight>{text}</span>
  {/snippet}
  {#each fileTitleFragments as { text, highlight }, i}
    <div class="file-title">
      {@render titleFragment(text, highlight)}
    </div>
  {/each}
  {#if file.tfile.extension !== 'md'}
    <div class="file-extension-tag">{file.tfile.extension}</div>
  {/if}
</div>

<style lang="scss">
  @use '../global.scss' as *;

  .file-title-container {
    display: flex;
    align-items: baseline;
  }
  .file-title {
    @include text-overflow-styles;
    font-weight: var(--font-semibold);
    display: inline-block;
    white-space: pre;
  }
  .highlight {
    background-color: var(--text-highlight-bg);
  }

  // File Extension Tag
  .file-extension-tag {
    display: inline-block;
  }
  .file-extension-tag {
    background-color: var(--background-modifier-hover);
    border-radius: var(--radius-s);
    font-size: 9px;
    font-weight: var(--font-semibold);
    letter-spacing: 0.05em;
    line-height: var(--line-height-normal);
    margin-left: var(--size-2-3);
    padding: 0 var(--size-4-1);
    text-transform: uppercase;
    align-self: center;
    white-space: nowrap;
  }
</style>