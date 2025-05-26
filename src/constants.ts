import type { PluginData } from './types'
export const DEFAULT_DATA: PluginData = {
  pinnedFiles: [],
  settings: {
    omittedPaths: [],
    openType: 'tab',
    pinFiles: false,
    showParentFolder: true,
    sortBy: 'mtime'
  }
}
export const INFINITE_SCROLL_INTERVAL = 50
export const LIST_BORDER_WIDTH = 1
export const PLUGIN_ID = 'sidebar-notes-list'