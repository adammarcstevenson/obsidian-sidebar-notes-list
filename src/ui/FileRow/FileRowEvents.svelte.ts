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
          .setTitle(file.pinned ? l10n('contextMenuRemoveFilePin') : l10n('contextMenuPinFile'))
          .onClick(() => { files.handleFilePinnedToggle(file.tfile) })
      })
      menu.addSeparator()
    }

    // Open actions
    menu.addItem(item => {
      item
        .setTitle(l10n('contextMenuOpen'))
        .onClick(() => {
          files.openFile(file.tfile, {
            newLeaf: event.ctrlKey || event.metaKey
          })
        })
    })
    menu.addItem(item => {
      item
        .setTitle(l10n('contextMenuOpenInTab'))
        .onClick(() => {
          files.openFile(file.tfile, {
            openType: 'tab'
          })
        })
    })
    menu.addItem(item => {
      item
        .setTitle(l10n('contextMenuOpenInSplit'))
        .onClick(() => {
          files.openFile(file.tfile, {
            openType: 'split'
          })
        })
    })
    menu.addItem(item => {
      item
        .setTitle(l10n('contextMenuOpenInWindow'))
        .onClick(() => {
          files.openFile(file.tfile, {
            openType: 'window'
          })
        })
    })

    menu.addSeparator()

    // Delete action
    menu.addItem(item => {
      item
        .setTitle('Delete')
        .onClick(() => {
          getPlugin().app.vault.delete(file.tfile)
        })
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