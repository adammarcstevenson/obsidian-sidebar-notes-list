<script lang="ts">
  import {
    decodeHTMLEntities,
    getPlugin,
    removeMarkdown
  } from '../../utils'

  let { file } = $props()
  const showFileSnippet = file.tfile.extension  === 'md'
  const fileSnippet = async () => {
    if (!showFileSnippet) return null
    const snippet = decodeHTMLEntities(removeMarkdown((await getPlugin().app.vault.cachedRead(file.tfile))).substring(0, 500))
    if (!snippet) return null
    return snippet
  }
</script>

<span class="file-snippet-container">
  {#if showFileSnippet}
    {#await fileSnippet() then snippet}
      {#if snippet}
        <span class="file-contents-spacer"> &bull; </span>
        <span class="file-snippet">{snippet}</span>
      {:else}
        <!-- Show nothing if no file contents -->
      {/if}
    {/await}
  {:else}
    <!-- Show nothing if not a markdown file -->
  {/if}
</span>

<style lang="scss">
  .file-snippet,
  .file-contents-spacer {
    color: var(--text-faint);
  }
</style>