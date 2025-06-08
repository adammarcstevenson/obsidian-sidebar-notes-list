<script lang="ts">
  import { getIcon } from 'obsidian'
  import { onMount } from 'svelte'
  
  import { l10n } from '../l10n/l10n'
  import state from '../state'

  let searchIconContainer: HTMLElement
  onMount(() => {
    const searchIcon = getIcon('search') as Node
    searchIconContainer.append(searchIcon)
  })

  const clearSearchInput = () => {
    state.searchInput.reset()
  }

  let searchInputEl: HTMLInputElement
  export const focus = () => searchInputEl.focus()

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

<div
  class="search"
>
  <div
    bind:this={searchIconContainer}
    class="icon-container search-icon-container"
  ></div>
  <input
    bind:this={searchInputEl}
    bind:value={state.searchInput.value}
    on:keydown={inputOnKeyDown}
    placeholder="{l10n('searchPlaceholder') as string}"
    tabindex="0"
    type="search"
  />
  <div
    class="icon-container clear-icon-container"
    class:hide={!state.searchInput.value}
    on:click={clearSearchInput}
    on:keydown={clearIconOnKeyDown}
    role="button"
    tabindex="0"
  >
    <svg
      class="clear-icon"
      fill="none"
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12ZM3.8705 3.09766L6.00003 5.22718L8.12955 3.09766L8.9024 3.8705L6.77287 6.00003L8.9024 8.12955L8.12955 8.9024L6.00003 6.77287L3.8705 8.9024L3.09766 8.12955L5.22718 6.00003L3.09766 3.8705L3.8705 3.09766Z" 
        fill="currentColor"
      />
    </svg>
  </div>
</div>

<style lang="scss">
  .search {
    position: relative;
    margin: var(--size-4-2);
  }
  .search > input {
    width: 100%;
    padding-left: var(--size-4-8);
    padding-right: var(--size-4-8);
  }

  // Icons
  .icon-container {
    position: absolute;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .search-icon-container {
    left: var(--size-4-2);
  }
  .clear-icon-container {
    right: var(--size-4-2);
    color: var(--search-clear-button-color);
    cursor: pointer;
  }
  .clear-icon-container:hover {
    color: inherit;
  }
  .clear-icon {
    width: var(--icon-xs);
    height: var(--icon-xs);
  }
  .hide {
    display: none;
  }
</style>