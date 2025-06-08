class SearchInput {
  value = $state<string>('')
  reset = () => { this.value = '' }
  showSearch = $state<() => void>(() => {})
}

export default SearchInput
