import { untrack } from 'svelte'
import Files from './Files.svelte'
import { getNormalizedString } from '../utils'
import InfiniteScroll from './InfiniteScroll.svelte'
import SearchInput from './SearchInput.svelte'
import type { File } from '../types'

class List {
  files: Files
  infiniteScroll: InfiniteScroll
  searchInput: SearchInput
  #lastSearchValue: string

  constructor (files: Files, infiniteScroll: InfiniteScroll, searchInput: SearchInput) {
    this.files = files
    this.infiniteScroll = infiniteScroll
    this.searchInput = searchInput
    this.#lastSearchValue = searchInput.value
  }

  value = $derived.by<File[]>(() => {
    let list = this.files.value

    // Reset pagination only when the search query itself changes, not on every
    // recompute (e.g. triggered by infiniteScroll.loadMore() while searching)
    if (this.searchInput.value !== this.#lastSearchValue) {
      this.#lastSearchValue = this.searchInput.value
      untrack(() => this.infiniteScroll.reset())
    }

    // Filter list by search input
    if (this.searchInput.value) {
      list = list.filter((file: File) => {
        const fileNameWords = getNormalizedString(file.tfile.basename).split(/\s+/)
        const searchInputWords = getNormalizedString(this.searchInput.value).split(/\s+/)
        return searchInputWords.every(searchInputWord => fileNameWords.some(fileNameWord => fileNameWord.includes(searchInputWord)))
      })
    }

    // Truncate list
    list = list.slice(0, this.infiniteScroll.value)

    // Handle timestamp grouping labels
    for (let i = 0; i < list.length; i++) {
      const file = list[i]
      if (i === 0) {
        file.showTimestampGroupingLabel = true
        continue
      }
      if (file.timestampGroupingLabel !== list[i - 1].timestampGroupingLabel) {
        file.showTimestampGroupingLabel = true
        continue
      }
      file.showTimestampGroupingLabel = false
    }
    return list
  })
}

export default List
