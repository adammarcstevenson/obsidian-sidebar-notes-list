<script lang="ts">
  import { onMount } from 'svelte'

  import { LIST_BORDER_WIDTH } from '../constants'
  import FileRow from './FileRow/FileRow.svelte'
  import FileSearch from './FileSearch.svelte'
  import HeaderRow from './HeaderRow.svelte'
  import state from '../state'
  
  let listEl: HTMLElement
  let infiniteScrollEl: HTMLElement

  onMount(async () => {
    await state.files.loadFiles()

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.target.scrollHeight > entry.target.clientHeight) {
          headerRows[0].scrollIntoView()
          resizeObserver.disconnect()
        }
      }
    })
    resizeObserver.observe(listEl)

    const infiniteScrollObserver = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting) {
        state.infiniteScroll.loadMore()
      }
    }, {
      root: listEl,
      rootMargin: '500px'
    })
    infiniteScrollObserver.observe(infiniteScrollEl)
  })
  
  let headerRows: HeaderRow[] = []
  const onScroll = () => {
    const listRect = listEl.getBoundingClientRect()
    const headers = headerRows.filter(headerRow => headerRow)

    for (let i = 0; i < headers.length - 1; i++) {
      const header = headers[i]
      const headerRect = header.getBoundingClientRect()
      const diff = headerRect.top - (listRect.top + LIST_BORDER_WIDTH)
      if (diff > 0) continue
      
      const nextHeaderRect = headers[i + 1].getBoundingClientRect()
      
      if (nextHeaderRect.top - listRect.top < headerRect.height) {
        header.updateStyleTop(Math.max(nextHeaderRect.top - (listRect.top + LIST_BORDER_WIDTH), 0) - headerRect.height + 'px')
      } else {
        header.updateStyleTop('0px')
      }
    }
    const lastHeader = headers[headers.length - 1]
    lastHeader.updateStyleTop('0px')
  }

  let rows: HTMLElement[] = []
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault()
      const i = state.list.value.findIndex(file => file.active)
      if (
        (i === state.list.value.length - 1 && event.key === 'ArrowDown') ||
        (i === 0 && event.key === 'ArrowUp')
      ) return
      state.files.openFile(state.list.value[i + (event.key === 'ArrowDown' ? 1 : -1)].tfile, {
        active: false,
        newLeaf: false
      })
      const activeRow = rows[state.list.value.findIndex(file => file.active)]
      activeRow.scrollIntoView({
        behavior: 'instant',
        block: 'nearest'
      })
    }
  }

  let fileSearch: FileSearch
  const showSearch = () => {
    listEl.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    fileSearch.focus()
  }
  state.searchInput.showSearch = showSearch
</script>

<div
  bind:this={listEl}
  class="list"
  class:hide={state.loadingFiles.value}
  role="listbox"
  tabindex="0"
  on:keydown={onKeyDown}
  on:scroll={onScroll}
>
  <FileSearch bind:this={fileSearch} />
  {#each state.list.value as file, index}
    {#if file.showTimestampGroupingLabel}
      <HeaderRow
        bind:this={headerRows[index]}
        pinned={file.pinned}
        timestamp={file.timestampGroupingLabel}
      />
    {/if}
    <FileRow
      file={file}
      bind:rowEl={rows[index]}
    />
  {/each}
  <div
    bind:this={infiniteScrollEl}
    class="infinite-scroll"
  ></div>
</div>

<style lang="scss">
  @use './global.scss' as *;

  .list {
    border-top: none;
    height: 100%;
    overflow: auto;
    padding-left: var(--size-4-4);
    padding-right: var(--size-4-4);
    border-top: $border-style;
  }
  .infinite-scroll {
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: 1px;
    padding: var(--size-4-4);
    color: white;
  }
  .list.hide {
    display: none;
  }
</style>