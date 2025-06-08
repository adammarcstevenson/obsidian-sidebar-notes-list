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
  contextMenuTrashFile: 'Move to trash',

  // Settings page
  settingDonateLabel: 'Donate',
  settingDonateDescription: 'If you find this plugin useful, please consider supporting my work with a donation.',
  settingDonateButtonText: 'Buy me a coffee',
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