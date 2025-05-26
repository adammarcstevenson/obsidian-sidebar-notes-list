import { type TAbstractFile, TFile } from 'obsidian'

import {
  delay,
  getPlugin,
  getRelativeTimestamp,
  matchGlob
} from '../utils'
import PluginData from './PluginData'
import type { File } from '../types'
import LoadingFiles from './LoadingFiles.svelte'
import Settings from './Settings'
import { l10n } from '../l10n/l10n'

class Files {
  loadingFiles: LoadingFiles
  pluginData: PluginData
  settings: Settings
  value: File[] = $state([])

  constructor (loadingFiles: LoadingFiles, pluginData: PluginData, settings: Settings) {
    this.loadingFiles = loadingFiles
    this.pluginData = pluginData
    this.settings = settings
  }

  loadFiles = async () => {
    this.loadingFiles.set(true)
    await delay(100)
    this.value = []
    const files = getPlugin().app.vault.getFiles()
    files
      // .filter(file => {
      //   const patterns: string[] = this.settings.omittedPaths.filter((path: string) => path.length > 0)
      //   const fileMatchesGlobPattern = (pattern: string) => {
      //     try {
      //       return matchGlob(pattern, file.path)
      //     } catch (err) {
      //       // eslint-disable-next-line no-console
      //       console.error(`${l10n('pluginName')}: Invalid glob pattern: ${pattern}`, err)
      //       return false
      //     }
      //   }
      //   return !patterns.some(fileMatchesGlobPattern)
      // })
      .sort((a, b) => b.stat[this.settings.sortBy] - a.stat[this.settings.sortBy])
      .forEach(this.addFile)
    this.loadingFiles.set(false)

    // Register file events
    getPlugin().registerEvent(getPlugin().app.vault.on('create', this.handleFileCreate))
    getPlugin().registerEvent(getPlugin().app.vault.on('modify', this.handleFileUpdate))
    getPlugin().registerEvent(getPlugin().app.vault.on('rename', this.handleFileRename))
    getPlugin().registerEvent(getPlugin().app.vault.on('delete', this.handleFileDelete))
    getPlugin().registerEvent(getPlugin().app.workspace.on('file-open', this.handleFileOpen))
  }

  private addFile = (tfile: TFile) => {
  
    // Determine if file is active
    let active = false
    const activeFile = getPlugin().app.workspace.getActiveFile()
    if (activeFile && tfile.path === activeFile.path) {
      active = true
    }

    // Determine pinned status
    const pinned = this.settings.pinFiles ? this.pluginData.pinnedFiles.some((path: string) => path === tfile.path) : false

    const file = {
      active,
      pinned,
      showTimestampGroupingLabel: false,
      tfile,
      timestampGroupingLabel: getRelativeTimestamp(new Date(tfile.stat[this.settings.sortBy]), pinned)
    }
  
    // Add file to list
    this.insertFile(file)
  }

  private changeFile = (tfile: TAbstractFile) => {
    if (!(tfile instanceof TFile)) return
    
    // Find file and update file details
    const i = this.value.findIndex((row: File) => row.tfile.path === tfile.path)
    if (i < 0) return
    const row = this.value[i]
    row.tfile = tfile
    row.timestampGroupingLabel = getRelativeTimestamp(new Date(tfile.stat[this.settings.sortBy]), row.pinned)
    if (i === 0) {
      this.value = [...this.value]
    }
  
    // Remove file from files and re-insert in new order
    const file = this.value.splice(i, 1)[0]
    this.insertFile(file)
  }

  private checkOmittedPaths = (tfile: TFile): boolean => {
    const patterns: string[] = this.settings.omittedPaths.filter((path: string) => path.length > 0)
    const fileMatchesGlobPattern = patterns.some((pattern: string) => {
      try {
        return matchGlob(pattern, tfile.path)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(`${l10n('pluginName')}: Invalid glob pattern: ${pattern}`, err)
        return false
      }
    })
    return fileMatchesGlobPattern
  }

  handleFileCreate = (tfile: TAbstractFile) => {
    if (!(tfile instanceof TFile)) return
    this.addFile(tfile)
  }
  
  handleFileDelete = (tfile: TAbstractFile) => {
    if (!(tfile instanceof TFile)) return
    const i = this.value.findIndex((row: File) => row.tfile.path === tfile.path)
    this.value.splice(i, 1)
  }
  
  handleFileOpen = (tfile: TFile | null) => {
    const oldActiveRow = this.value.find((file: File) => file.active)
    if (oldActiveRow) {
      oldActiveRow.active = false
    }
    if (!tfile) return
    const newActiveRow = this.value.find((row: File) => row.tfile.path === tfile.path)
    if (newActiveRow) {
      newActiveRow.active = true
    }
  }

  handleFilePinnedToggle = (tfile: TFile) => {
    const i = this.value.findIndex((file: File) => file.tfile.path === tfile.path)
    let file = this.value[i]
    if (!file) return
    file.pinned = !file.pinned
    file.timestampGroupingLabel = getRelativeTimestamp(new Date(tfile.stat[this.settings.sortBy]), file.pinned)

    // Remove file from files and re-insert in new order
    file = this.value.splice(i, 1)[0]
    this.insertFile(file)

    if (file.pinned) {
      this.pluginData.addPinnedFile(file.tfile.path)
    } else {
      this.pluginData.removePinnedFile(file.tfile.path)
    }
  }
  
  handleFileRename = (tfile: TAbstractFile) => {
    this.changeFile(tfile)
  }
  
  handleFileUpdate = (tfile: TAbstractFile) => {
    this.changeFile(tfile)
  }

  private insertFile = (file: File) => {

    // If the file path is omitted, do not add it to the list
    const matchesOmittedPath = this.checkOmittedPaths(file.tfile)
    if (matchesOmittedPath) return

    /**
     * Determines the order of two files, based on pinned status and timestamp.
     * More recent files always rank ahead of older files.
     * Pinned files always rank ahead of non-pinned files. Pinned status takes precedence over recency.
     * - If > 0, `file1` should appear first in order
     * - If < 0, `file2` should appear first in order
     * - If = 0, both `file1` and `file2` are ranked equally
    **/
    const getFileOrder = (file1: File, file2: File) => {
      if (this.settings.pinFiles && file1.pinned !== file2.pinned) {
        return file1.pinned ? 1 : -1
      }
      return file1.tfile.stat[this.settings.sortBy] - file2.tfile.stat[this.settings.sortBy]
    }

    if (this.value.length === 0) {
      this.value.push(file)
      return
    }

    for (let i = 0; i < this.value.length; i++) {
      const refFile = this.value[i]
      if (getFileOrder(file, refFile) < 0) {
        if (i === this.value.length - 1) {
          this.value.push(file)
          break
        }
        continue
      }
      this.value.splice(i, 0, file)
      break
    } 
  }

  openFile = (file: TFile, {
    active = true,
    newLeaf = false,
    openType
  }: {
    active?: boolean,
    newLeaf?: boolean,
    openType?: 'split' | 'tab' | 'window'
  } = {}) => {
    let leaf = getPlugin().app.workspace.getMostRecentLeaf()
    const createLeaf = newLeaf || openType || leaf!.getViewState().pinned
    if (createLeaf || openType) {
      if (openType) {
        leaf = getPlugin().app.workspace.getLeaf(openType)
      } else {
        leaf = getPlugin().app.workspace.getLeaf(this.settings.openType)
      }
    }
    leaf!.openFile(file, { active })
    if (!active) {
      this.handleFileOpen(file)
    }
  } 
}

export default Files
