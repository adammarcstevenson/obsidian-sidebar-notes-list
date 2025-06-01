import { INFINITE_SCROLL_INTERVAL } from '../constants'

class InfiniteScroll {
  value = $state(INFINITE_SCROLL_INTERVAL)

  loadMore() {
    this.value += INFINITE_SCROLL_INTERVAL
  }

  reset() {
    this.value = INFINITE_SCROLL_INTERVAL
  }
}

export default InfiniteScroll
