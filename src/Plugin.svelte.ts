import {
   type App,
  Plugin,
  type PluginManifest,
  Workspace,
  type WorkspaceLeaf
} from 'obsidian'

import { DEFAULT_DATA } from './constants'
import { SidebarNotesListSettingTab } from './ui/SettingsTab/SettingsTab'
import { SidebarView } from './ui/SidebarView'
import state from './state'
import type { PluginData } from './types'

export class SidebarNotesListPlugin extends Plugin {
  static instance: SidebarNotesListPlugin

  constructor (app: App, manifest: PluginManifest) {
    super(app, manifest)
    SidebarNotesListPlugin.instance = this
  }

  public override async onload() {

    const saved = await this.loadData()
    state.pluginData.set({
      ...DEFAULT_DATA,
      ...saved,
      settings: { ...DEFAULT_DATA.settings, ...saved?.settings }
    })

    this.registerView(
      this.manifest.id,
      leaf => new SidebarView(leaf)
    )

    const revealLeafView = async () => {
      let [leaf] = this.app.workspace.getLeavesOfType(this.manifest.id)
      if (!leaf) {
        leaf = this.app.workspace.getLeftLeaf(false)!
        await leaf.setViewState({ type: this.manifest.id })
      }
      this.app.workspace.revealLeaf(leaf)
    }
    
    this.addCommand({
      id: `open`,
      name: 'Open',
      callback: revealLeafView
    })

    this.addCommand({
      id: `search`,
      name: 'Open and search',
      callback: async () => {
        await revealLeafView()
        state.searchInput.showSearch()
      }
    })

    this.app.workspace.onLayoutReady(() => {
      this.activateView()
    })

    this.addSettingTab(new SidebarNotesListSettingTab(this.app, this))
  }

  get listView() {
    const leaf = this.app.workspace.getLeavesOfType(this.manifest.id)[0]
    if (leaf?.view instanceof SidebarView) {
      return leaf.view
    }
    return null
  }

  public override onunload(): void {
    // @ts-expect-error - Using a private API, but it's the only way to unregister hover link sources
    (this.app.workspace as Workspace).unregisterHoverLinkSource(
      this.manifest.id,
    )
  }

  async activateView() {
    let leaf: WorkspaceLeaf | null = null
    const leaves = this.app.workspace.getLeavesOfType(this.manifest.id)
    if (leaves.length > 0) {
      // A leaf with our view already exists
      leaf = leaves[0]
    } else {
      // Our view could not be found in the workspace, create a new leaf in the left sidebar for it
      leaf = this.app.workspace.getLeftLeaf(false)
      if (!leaf) {
        // eslint-disable-next-line no-console
        console.error('Failed to get left leaf for Sidebar Notes List plugin')
        return
      }
      await leaf.setViewState({
        type: this.manifest.id,
        active: true,
      })
    }

    this.app.workspace.revealLeaf(leaf)
  }

  async savePluginData(data: PluginData): Promise<void> {
    await this.saveData(data)
  }
}