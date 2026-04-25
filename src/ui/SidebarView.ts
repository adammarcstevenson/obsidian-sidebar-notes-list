import {
  ItemView,
  type WorkspaceLeaf
} from 'obsidian'
import { mount, unmount } from 'svelte'
import { l10n } from '../l10n/l10n'
import Sidebar from './SidebarView.svelte'
import state from '../state'
import { getPlugin } from '../utils'

export class SidebarView extends ItemView {
  private sidebarComponent: ReturnType<typeof Sidebar> | undefined

  constructor(
    leaf: WorkspaceLeaf,
  ) {
    super(leaf)
  }

  public override load() {
    super.load()

    // Register file events
    this.registerEvent(this.app.vault.on('create', state.files.handleFileCreate))
    this.registerEvent(this.app.vault.on('modify', state.files.handleFileUpdate))
    this.registerEvent(this.app.vault.on('rename', state.files.handleFileRename))
    this.registerEvent(this.app.vault.on('delete', state.files.handleFileDelete))
    this.registerEvent(this.app.workspace.on('file-open', state.files.handleFileOpen))
  }

  public override async onOpen() {
    this.contentEl.empty()
    this.sidebarComponent = mount(Sidebar, {
      target: this.contentEl
    })
  }

  public override async onClose() {
    if (this.sidebarComponent) {
      unmount(this.sidebarComponent)
    }
  }
  
  public getViewType() {
    return getPlugin().manifest.id
  }
  
  public getDisplayText() {
    return l10n('listViewDisplayName') as string
  }
  
  public override getIcon() {
    return 'files'
  }
}