import { TFile } from 'obsidian'

type ActionMenuItem = {
  ariaLabel: string
  iconId: string,
  onClickHandler: (() => void) | ((event: MouseEvent) => void)
}
type File = {
  active: boolean,
  pinned: boolean,
  showTimestampGroupingLabel: boolean,
  tfile: TFile,
  timestampGroupingLabel: string
}
type OpenType = 'split' | 'tab' | 'window'
type PluginData = {
  pinnedFiles: string[],
  settings: PluginSettings
}
type PluginSettings = {
  omittedPaths: string[]
  openType: OpenType,
  pinFiles: boolean,
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
  OpenType,
  PluginData,
  PluginSettings,
  Timestamp,
  TitleFragment
}