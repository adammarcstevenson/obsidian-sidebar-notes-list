<script lang="ts">
  import ActionMenu from './ActionMenu.svelte'
  import FileList from './FileList.svelte'
  import ListLoadingView from './ListLoadingView.svelte'
</script>

<div class="sidebar">
  <ActionMenu />
  <ListLoadingView />
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
  :global(.is-mobile), :global(.is-tablet) {
    .sidebar {
      flex-direction: column-reverse;
    }
  }
</style>