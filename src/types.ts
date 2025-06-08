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
type PluginData = {
  pinnedFiles: string[],
  settings: PluginSettings
}
type PluginSettings = {
  omittedPaths: string[]
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
  PluginData,
  PluginSettings,
  Timestamp,
  TitleFragment
}