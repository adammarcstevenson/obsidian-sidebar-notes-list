class SearchInput {
  value = $state<string>('')
  isVisible = $state<boolean>(false)
  reset = () => { this.value = '' }
  showSearch = () => { this.isVisible = true }
  toggle = () => { this.isVisible = !this.isVisible }
}

export default SearchInput
