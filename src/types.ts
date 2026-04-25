import { TFile } from 'obsidian'

type ActionMenuItem = {
  ariaLabel: string
  iconId: string,
  isActive?: () => boolean,
  onClickHandler: (() => void) | ((event: MouseEvent) => void),
  showOnlyInDebugMode?: boolean
}
type File = {
  active: boolean,
  pinned: boolean,
  showTimestampGroupingLabel: boolean,
  tfile: TFile,
  timestampGroupingLabel: string
}
type PluginData = {
  pinnedFiles: string[],
  settings: PluginSettings
}
type PluginSettings = {
  omittedPaths: string[]
  pinFiles: boolean,
  showFrontmatter: boolean,
  showParentFolder: boolean,
  sortBy: Timestamp
}
type Timestamp = 'ctime' | 'mtime'
type TitleFragment = {
  text: string,
  highlight: boolean
}

export type {
  ActionMenuItem,
  File,
  PluginData,
  PluginSettings,
  Timestamp,
  TitleFragment
}