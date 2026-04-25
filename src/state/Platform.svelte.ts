import { Platform as ObsidianPlatform } from 'obsidian'

class Platform {
  #resizeCounter = $state(0)

  isMobile = $derived.by(() => { this.#resizeCounter; return ObsidianPlatform.isMobile })
  isDesktop = $derived.by(() => { this.#resizeCounter; return ObsidianPlatform.isDesktop })
  isMacOS = $derived.by(() => { this.#resizeCounter; return ObsidianPlatform.isMacOS })
  isWin = $derived.by(() => { this.#resizeCounter; return ObsidianPlatform.isWin })
  isLinux = $derived.by(() => { this.#resizeCounter; return ObsidianPlatform.isLinux })
  isPhone = $derived.by(() => { this.#resizeCounter; return ObsidianPlatform.isPhone })
  isTablet = $derived.by(() => { this.#resizeCounter; return ObsidianPlatform.isTablet })
  isIosApp = $derived.by(() => { this.#resizeCounter; return ObsidianPlatform.isIosApp })
  isAndroidApp = $derived.by(() => { this.#resizeCounter; return ObsidianPlatform.isAndroidApp })
  isSafari = $derived.by(() => { this.#resizeCounter; return ObsidianPlatform.isSafari })

  constructor() {
    const resizeObserver = new ResizeObserver(() => {
      this.#resizeCounter++
    })
    resizeObserver.observe(document.body)
  }
}

export default Platform
