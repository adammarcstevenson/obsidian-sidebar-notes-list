<script lang="ts">
  import ActionMenu from './ActionMenu.svelte'
  import FileList from './FileList.svelte'
  import FileSearch from './FileSearch.svelte'
  import state from '../state'
</script>

<div class="sidebar">
  <ActionMenu />
  {#if state.searchInput.isVisible}
    <FileSearch />
  {/if}
  <FileList />
</div>

<style lang="scss">
  .sidebar {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0;
    overflow: auto;
  }
  
  // Removed padding added by Obsidian to view content container
  :global(div[data-type="sidebar-notes-list"] > div.view-content) {
    padding: 0;
  }
</style>