export const enUS: {
  [key: string]: string | (() => DocumentFragment)
} = {
  // Names
  listViewDisplayName: 'Notes',
  pluginName: import.meta.env.NODE_ENV === 'development' ? 'Sidebar Notes List (Dev)' : 'Sidebar Notes List',

  // Action menu
  newNoteLabel: 'New note',
  searchLabel: 'Search',
  changeSortOrderLabel: 'Change sort order',
  sortOptionCreated: 'Created (newest to oldest)',
  sortOptionLastModified: 'Last modified (newest to oldest)',

  // File row context menu
  contextMenuPinFile: 'Pin file',
  contextMenuRemoveFilePin: 'Unpin file',
  contextMenuOpen: 'Open',
  contextMenuOpenInTab: 'Open in new tab',
  contextMenuOpenInSplit: 'Open to the right',
  contextMenuOpenInWindow: 'Open in new window',

  // Settings page
  settingOmittedPathsLabel: 'Omitted paths',
  settingOmittedPathsDescription: () => {
    const fragment = document.createDocumentFragment()
    fragment.append('Omit paths from the file list. Use glob patterns to define the paths to omit. One pattern per line. See ')
    const link = document.createElement('a')
    link.href = 'https://michaelcurrin.github.io/dev-cheatsheets/cheatsheets/shell/files/globbing.html'
    link.text = 'Globbing | Dev Cheatsheets'
    fragment.append(link)
    fragment.append(' for guidance.')
    return fragment
  },
  settingOpenTypeLabel: 'Open note in',
  settingOpenTypeDescription: 'Open files a new tab, split view, or new window (desktop only).',
  settingOpenTypeOptionTab: 'tab',
  settingOpenTypeOptionSplit: 'split',
  settingOpenTypeOptionWindow: 'window',
  settingPinnedFilesLabel: 'Pinned files',
  settingPinnedFilesDescription: 'Pin files to the top of the sidebar list',
  settingShowParentLabel: 'Show parent folder',
  settingShowParentDescription: 'Show the name of a file\'s parent folder',
  settingSortByLabel: 'Sort by',

  // Timestamps
  relativeTimestampToday: 'Today',
  relativeTimestampYesterday: 'Yesterday',
  relativeTimestampLast7Days: 'Last 7 days',
  relativeTimestampLast30Days: 'Last 30 days',
  relativeTimestampPinned: 'Pinned',

  // Miscellaneous
  loadingFilesMessage: 'Loading files…',
  noticeSortOrderChanged: 'Sort order changed',
  pinActionLabel: 'Pin file',
  removePinActionLabel: 'Remove pin',
  searchPlaceholder: 'Search…',
  untitledFilename: 'Untitled',
  viewIconLabel: 'Notes'
}

export const translations: {
  [key: string]: typeof enUS
} = {
  'en-US': enUS
}