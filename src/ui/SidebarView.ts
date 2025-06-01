import {
  ItemView,
  type WorkspaceLeaf
} from 'obsidian'
import { mount } from 'svelte'
import { PLUGIN_ID } from '../constants'
import { l10n } from '../l10n/l10n'
import Sidebar from './SidebarView.svelte'

export class SidebarView extends ItemView {

  constructor(
    leaf: WorkspaceLeaf,
  ) {
    super(leaf)
  }
  
  public override load() {
    super.load()
  }
  
  public override async onOpen() {
    const viewContent = this.contentEl
    viewContent.empty()
    viewContent.setAttribute('style', 'padding: 0;')
    mount(Sidebar, {
      target: this.contentEl
    })
  }
  
  public getViewType() {
    return PLUGIN_ID
  }
  
  public getDisplayText() {
    return l10n('listViewDisplayName')
  }
  
  public override getIcon() {
    return 'files'
  }
}