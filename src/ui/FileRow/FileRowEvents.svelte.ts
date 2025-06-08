import { Menu } from 'obsidian'

import { l10n } from '../../l10n/l10n'
import { getPlugin } from '../../utils/get-plugin'
import state from '../../state'
import type { File } from '../../types'

const { files, settings } = state

export class FileRowEvents {

  static onAuxClick = (event: MouseEvent, file: File) => {
    if (event.button !== 1) return
    files.openFile(file.tfile, {
      newLeaf: true
    })
  }

  static onClick = (event: MouseEvent, file: File) => {
    const openFile = getPlugin().app.workspace.getMostRecentLeaf()?.getViewState().state?.file
    if (openFile !== file.tfile.path) {
      files.openFile(file.tfile, {
        newLeaf: event.ctrlKey || event.metaKey
      })
    }
  }

  static onContextMenu = (event: MouseEvent, file: File) => {
    const menu = new Menu()

    // Pin action
    if (settings.pinFiles) {
      menu.addItem(item => {
        item
          .setSection('pin')
          .setTitle(file.pinned ? l10n('contextMenuRemoveFilePin') : l10n('contextMenuPinFile'))
          .setIcon(file.pinned ? 'pin-off' : 'pin')
          .onClick(() => { files.handleFilePinnedToggle(file.tfile) })
      })
      menu.addSeparator()
    }

    menu.addSeparator()

    getPlugin().app.workspace.trigger(
      'file-menu',
      menu,
      file.tfile,
      'sidebar-notes-list-plugin'
    )

    // Trash action
    menu.addItem(item => {
      item
        .setSection('danger')
        .setTitle(l10n('contextMenuTrashFile'))
        .setIcon('trash')
        // @ts-expect-error - `setWarning` is not a documented method, but used by Obsidian
        .setWarning(true)
        // @ts-expect-error - `commands` is not a documented property, but used by Obsidian
        .onClick(() => { getPlugin().app.commands.executeCommandById('app:delete-file') })
    })

    menu.showAtPosition({ x: event.clientX, y: event.clientY })
  }

  static onDragStart = (event: DragEvent, file: File) => {
    const tfile = getPlugin().app.metadataCache.getFirstLinkpathDest(
      file.tfile.path,
      '',
    )
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dragManager = (getPlugin().app as any).dragManager
    const dragData = dragManager.dragFile(event, tfile)
    dragManager.onDragStart(event, dragData)
  }

  static onKeyUp = (event: KeyboardEvent, file: File) => {
    if (event.code === 'Enter') {
      files.openFile(file.tfile, {
        newLeaf: event.ctrlKey || event.metaKey
      })
    }
  }

  static onPinClick = (event: MouseEvent, file: File) => {
    event.stopPropagation()
    files.handleFilePinnedToggle(file.tfile)
  }
}