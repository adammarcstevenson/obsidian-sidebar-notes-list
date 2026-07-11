import { App, Menu, TFile } from 'obsidian'

import { l10n } from '../../l10n/l10n'
import { getPlugin } from '../../utils/get-plugin'
import state from '../../state'
import type { File } from '../../types'

const { files, list, settings } = state

export class FileRowEvents {

  private static clickTimer: ReturnType<typeof setTimeout> | null = null

  static onAuxClick = (event: MouseEvent, file: File) => {
    if (event.button !== 1) return
    files.openFile(file.tfile, {
      newLeaf: true
    })
  }

  static onClick = (event: MouseEvent, file: File) => {
    if (event.shiftKey) {
      if (FileRowEvents.clickTimer !== null) {
        clearTimeout(FileRowEvents.clickTimer)
        FileRowEvents.clickTimer = null
      }
      files.selectFileRange(file.tfile, list.value)
      return
    }

    if (event.altKey) {
      if (FileRowEvents.clickTimer !== null) {
        clearTimeout(FileRowEvents.clickTimer)
        FileRowEvents.clickTimer = null
      }
      files.toggleFileSelection(file.tfile)
      return
    }

    files.clearSelection()
    files.lastInteractedPath = file.tfile.path

    if (FileRowEvents.clickTimer !== null) return
    FileRowEvents.clickTimer = setTimeout(() => {
      FileRowEvents.clickTimer = null
      const openFile = getPlugin().app.workspace.getMostRecentLeaf(getPlugin().app.workspace.rootSplit)?.getViewState().state?.file
      if (openFile !== file.tfile.path) {
        files.openFile(file.tfile, {
          newLeaf: event.ctrlKey || event.metaKey
        })
      }
    }, 200)
  }

  static onDblClick = (_event: MouseEvent, file: File) => {
    if (FileRowEvents.clickTimer !== null) {
      clearTimeout(FileRowEvents.clickTimer)
      FileRowEvents.clickTimer = null
    }
    files.openFile(file.tfile, { newWindow: true })
  }

  static onContextMenu = (event: MouseEvent, file: File) => {
    const selectedFiles = files.getSelectedFiles()
    const isMultiSelect = file.selected && selectedFiles.length > 1

    if (!isMultiSelect) {
      files.clearSelection()
    }

    const menu = new Menu()

    if (isMultiSelect) {
      const tfiles = selectedFiles.map(f => f.tfile)
      const allPinned = selectedFiles.every(f => f.pinned)

      // Pin action
      if (settings.pinFiles) {
        menu.addItem(item => {
          item
            .setSection('pin')
            .setTitle(allPinned ? l10n('contextMenuRemoveFilePins') : l10n('contextMenuPinFiles'))
            .setIcon(allPinned ? 'pin-off' : 'pin')
            .onClick(() => { files.setFilesPinnedState(tfiles, !allPinned) })
        })
        menu.addSeparator()
      }

      menu.addSeparator()

      getPlugin().app.workspace.trigger(
        'files-menu',
        menu,
        tfiles,
        'sidebar-notes-list-plugin'
      )

      // Trash action
      menu.addItem(item => {
        item
          .setSection('danger')
          .setTitle((l10n('contextMenuTrashFiles') as string).replace('{count}', String(tfiles.length)))
          .setIcon('trash')
          .setWarning(true)
          .onClick(() => {
            tfiles.forEach(tfile => { getPlugin().app.fileManager.trashFile(tfile) })
            files.clearSelection()
          })
      })
    } else {

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
          .setWarning(true)
          .onClick(() => { getPlugin().app.fileManager.trashFile(file.tfile) })
      })
    }

    menu.showAtPosition({ x: event.clientX, y: event.clientY })
  }

  static onDragStart = (event: DragEvent, file: File) => {
    // @ts-expect-error - `dragManager` is not a documented property, but used by Obsidian
    const dragManager = (getPlugin().app as App).dragManager

    const selectedFiles = files.getSelectedFiles()
    if (file.selected && selectedFiles.length > 1) {
      const tfiles = selectedFiles
        .map(f => getPlugin().app.metadataCache.getFirstLinkpathDest(f.tfile.path, ''))
        .filter((tfile): tfile is TFile => tfile !== null)
      const dragData = dragManager.dragFiles(event, tfiles)
      dragManager.onDragStart(event, dragData)
      return
    }

    const tfile = getPlugin().app.metadataCache.getFirstLinkpathDest(
      file.tfile.path,
      '',
    )
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