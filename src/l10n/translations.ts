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
  refreshLabel: 'Refresh',

  // File row context menu
  contextMenuPinFile: 'Pin file',
  contextMenuRemoveFilePin: 'Unpin file',
  contextMenuTrashFile: 'Move to trash',
  contextMenuPinFiles: 'Pin files',
  contextMenuRemoveFilePins: 'Unpin files',
  contextMenuTrashFiles: 'Move {count} files to trash',

  // Settings page
  settingAdvancedHeading: 'Advanced',
  settingDonateHeading: 'Donate',
  settingDonateLabel: 'Support this plugin',
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
  settingShowFrontmatterLabel: 'Show frontmatter',
  settingShowFrontmatterDescription: 'Show the note\'s frontmatter in the note preview',
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

export const fr: typeof enUS = {
  // Names
  listViewDisplayName: 'Notes',
  pluginName: import.meta.env.NODE_ENV === 'development' ? 'Sidebar Notes List (Dev)' : 'Sidebar Notes List',

  // Action menu
  newNoteLabel: 'Nouvelle note',
  searchLabel: 'Rechercher',
  changeSortOrderLabel: 'Modifier l\'ordre de tri',
  sortOptionCreated: 'Date de création (du plus récent au plus ancien)',
  sortOptionLastModified: 'Date de modification (du plus récent au plus ancien)',
  refreshLabel: 'Actualiser',

  // File row context menu
  contextMenuPinFile: 'Épingler le fichier',
  contextMenuRemoveFilePin: 'Désépingler le fichier',
  contextMenuTrashFile: 'Déplacer vers la corbeille',
  contextMenuPinFiles: 'Épingler les fichiers',
  contextMenuRemoveFilePins: 'Désépingler les fichiers',
  contextMenuTrashFiles: 'Déplacer {count} fichiers vers la corbeille',

  // Settings page
  settingAdvancedHeading: 'Avancé',
  settingDonateHeading: 'Faire un don',
  settingDonateLabel: 'Soutenir ce plugin',
  settingDonateDescription: 'Si ce plugin vous est utile, pensez à soutenir mon travail par un don.',
  settingDonateButtonText: 'Offrez-moi un café',
  settingOmittedPathsLabel: 'Chemins ignorés',
  settingOmittedPathsDescription: () => {
    const fragment = document.createDocumentFragment()
    fragment.append('Ignorer certains chemins dans la liste des fichiers. Utilisez des motifs glob pour définir les chemins à ignorer. Un motif par ligne. Voir ')
    const link = document.createElement('a')
    link.href = 'https://michaelcurrin.github.io/dev-cheatsheets/cheatsheets/shell/files/globbing.html'
    link.text = 'Globbing | Dev Cheatsheets'
    fragment.append(link)
    fragment.append(' pour plus d\'informations.')
    return fragment
  },
  settingPinnedFilesLabel: 'Fichiers épinglés',
  settingPinnedFilesDescription: 'Épingler des fichiers en haut de la liste de la barre latérale',
  settingShowFrontmatterLabel: 'Afficher les métadonnées',
  settingShowFrontmatterDescription: 'Afficher les métadonnées de la note dans l\'aperçu',
  settingShowParentLabel: 'Afficher le dossier parent',
  settingShowParentDescription: 'Afficher le nom du dossier parent du fichier',
  settingSortByLabel: 'Trier par',

  // Timestamps
  relativeTimestampToday: 'Aujourd\'hui',
  relativeTimestampYesterday: 'Hier',
  relativeTimestampLast7Days: '7 derniers jours',
  relativeTimestampLast30Days: '30 derniers jours',
  relativeTimestampPinned: 'Épinglés',

  // Miscellaneous
  loadingFilesMessage: 'Chargement des fichiers…',
  noticeSortOrderChanged: 'Ordre de tri modifié',
  pinActionLabel: 'Épingler le fichier',
  removePinActionLabel: 'Retirer l\'épingle',
  searchPlaceholder: 'Rechercher…',
  untitledFilename: 'Sans titre',
  viewIconLabel: 'Notes'
}

export const translations: {
  [key: string]: typeof enUS
} = {
  'en': enUS,
  'fr': fr
}