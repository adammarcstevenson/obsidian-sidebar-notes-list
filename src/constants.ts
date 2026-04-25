import type { PluginData } from './types'
export const DEFAULT_DATA: PluginData = {
  pinnedFiles: [],
  settings: {
    omittedPaths: [],
    pinFiles: false,
    showFrontmatter: false,
    showParentFolder: true,
    sortBy: 'mtime'
  }
}
export const FILE_LOADING_CHUNK_SIZE = 50
export const INFINITE_SCROLL_INTERVAL = 50
export const LIST_BORDER_WIDTH = 1
