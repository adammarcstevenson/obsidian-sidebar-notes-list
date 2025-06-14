import { getPlugin } from '../utils'
import type { PluginSettings } from '../types'

class PluginData {
  public data = $state({
    pinnedFiles: [] as string[],
    settings: {} as PluginSettings
  })

  // Data setter
  set(data: {
    pinnedFiles: string[],
    settings: PluginSettings
  }) {
    this.data = data
  }

  // Pinned Files
  get pinnedFiles() {
    return this.data.pinnedFiles
  }

  async addPinnedFile(path: string) {
    this.data.pinnedFiles.push(path)
    await getPlugin().saveData(this.data)
  }

  async removePinnedFile(path: string) {
    const i = this.data.pinnedFiles.findIndex(filePath => filePath === path)
    if (i === -1) return
    this.data.pinnedFiles.splice(i, 1)
    await getPlugin().saveData(this.data)
  }

  // Settings
  get settings() {
    return this.data.settings
  }

  async updateSetting<K extends keyof PluginSettings>(key: K, value: PluginSettings[K]) {
    this.data.settings[key] = value
    await getPlugin().saveData(this.data)
  }
}

export default PluginData
