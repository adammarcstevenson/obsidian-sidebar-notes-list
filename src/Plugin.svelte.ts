import {
   type App,
  Plugin,
  type PluginManifest,
  Workspace,
  type WorkspaceLeaf
} from 'obsidian'

import { DEFAULT_DATA, PLUGIN_ID } from './constants'
import { l10n } from './l10n/l10n'
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
    // eslint-disable-next-line no-console
    console.log(`${l10n('pluginName')}: Loading plugin v${this.manifest.version}`)

    state.pluginData.set(Object.assign(DEFAULT_DATA, await this.loadData()))

    this.registerView(
      PLUGIN_ID,
      leaf => new SidebarView(leaf)
    )

    const revealLeafView = async () => {
      let [leaf] = this.app.workspace.getLeavesOfType(PLUGIN_ID)
      if (!leaf) {
        leaf = this.app.workspace.getLeftLeaf(false)!
        await leaf.setViewState({ type: PLUGIN_ID })
      }
      this.app.workspace.revealLeaf(leaf)
    }
    
    this.addCommand({
      id: `${PLUGIN_ID}-open`,
      name: 'Open',
      callback: revealLeafView
    })

    this.addCommand({
      id: `${PLUGIN_ID}-search`,
      name: 'Open and search',
      callback: async () => {
        await revealLeafView()
        state.searchInput.showSearch()
      }
    })

    this.registerHoverLinkSource(PLUGIN_ID, {
      defaultMod: true,
      display: l10n('pluginName'),
    })

    if (this.app.workspace.layoutReady) {
      this.activateView()
    }

    this.addSettingTab(new SidebarNotesListSettingTab(this.app, this))

    // eslint-disable-next-line no-console
    console.log(`Loaded ${l10n('pluginName')} at ${new Date().toLocaleTimeString()}`)
  }

  get listView() {
    return this.app.workspace.getLeavesOfType(PLUGIN_ID)[0].view as SidebarView
  }

  public override onunload(): void {
    // @ts-expect-error - Using a private API, but it's the only way to unregister hover link sources
    (this.app.workspace as Workspace).unregisterHoverLinkSource(
      PLUGIN_ID,
    )
  }

  async activateView() {
    let leaf: WorkspaceLeaf | null = null
    const leaves = this.app.workspace.getLeavesOfType(PLUGIN_ID)
    if (leaves.length > 0) {
      // A leaf with our view already exists
      leaf = leaves[0]
    } else {
      // Our view could not be found in the workspace, create a new leaf in the left sidebar for it
      leaf = this.app.workspace.getLeftLeaf(false)
      await leaf!.setViewState({
        type: PLUGIN_ID,
        active: true,
      })
    }
  }

  async savePluginData(data: PluginData): Promise<void> {
    await this.saveData(data)
  }
}