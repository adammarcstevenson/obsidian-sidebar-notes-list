<script lang="ts">
  import { onMount } from 'svelte'

  import { l10n } from '../l10n/l10n'
  import state from '../state'

  const clearSearchInput = () => {
    state.searchInput.reset()
  }

  let searchInputEl: HTMLInputElement

  onMount(() => {
    searchInputEl.focus()
  })

  const inputOnKeyDown = (event: KeyboardEvent) => {
    if (!event.target) return
    if (event.key === 'Enter') {
      (event.target as HTMLInputElement).blur()
    }
  }

  const clearIconOnKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Space') {
      clearSearchInput()
    }
  }
</script>

<div class="search-input-container">
  <input
    bind:this={searchInputEl}
    bind:value={state.searchInput.value}
    on:keydown={inputOnKeyDown}
    enterkeyhint="search"
    placeholder="{l10n('searchPlaceholder') as string}"
    tabindex="0"
    type="search"
  />
  <div
    class="search-input-clear-button"
    class:hide={!state.searchInput.value}
    on:click={clearSearchInput}
    on:keydown={clearIconOnKeyDown}
    role="button"
    tabindex="0"
  ></div>
</div>

<style lang="scss">
  .search-input-container {
    margin: var(--size-4-2);
  }
</style>