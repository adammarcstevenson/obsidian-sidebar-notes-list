import { Notice } from 'obsidian'

import { l10n } from '../l10n/l10n'
import PluginData from './PluginData'
import type { PluginSettings, Timestamp } from '../types'
import { compareArrays } from '../utils'

class Settings {
  pluginData: PluginData

  constructor (pluginData: PluginData) {
    this.pluginData = pluginData
  }

  // Omitted Paths
  get omittedPaths() {
    return this.pluginData.settings.omittedPaths
  }
  setOmittedPaths = async (paths: string[]): Promise<boolean> => {
    paths = paths.filter((path: string) => path.length > 0)
    if (compareArrays(this.pluginData.settings.omittedPaths, paths)) return false
    await this.pluginData.updateSetting('omittedPaths', paths)
    return true
  }

  // Open Type
  get openType() {
    return this.pluginData.settings.openType
  }
  setOpenType = async (type: PluginSettings['openType']) => {
    await this.pluginData.updateSetting('openType', type)
  }

  // Pin Files
  get pinFiles() {
    return this.pluginData.settings.pinFiles
  }
  setPinFiles = async (bool: boolean) => {
    await this.pluginData.updateSetting('pinFiles', bool)
  }

  // Show Parent Folder
  get showParentFolder() {
    return this.pluginData.settings.showParentFolder
  }
  setShowParentFolder = async (bool: boolean) => {
    await this.pluginData.updateSetting('showParentFolder', bool)
  }

  // Sort By
  get sortBy() {
    return this.pluginData.settings.sortBy
  }
  setSortBy = async (type: Timestamp, reloadFilesCallback: () => Promise<void>) => {
    this.pluginData.updateSetting('sortBy', type)
    await reloadFilesCallback()
    new Notice(l10n('noticeSortOrderChanged'))
  }
}

export default Settings
