import {
  type App,
  PluginSettingTab,
  Setting
} from 'obsidian'
import { mount } from 'svelte'

import { l10n } from '../../l10n/l10n'
import { SidebarNotesListPlugin } from '../../Plugin.svelte'
import state from '../../state'
import type { Timestamp } from '../../types'
import DonateOption from './DonateOption.svelte'

export class SidebarNotesListSettingTab extends PluginSettingTab {

  constructor(app: App, plugin: SidebarNotesListPlugin) {
    super(app, plugin)
  }

  public display(): void {
    const { containerEl } = this
    containerEl.empty()

    // Sort by
    new Setting(containerEl)
      .setName(l10n('settingSortByLabel'))
      .addDropdown(dropdown => {
        dropdown
          .addOptions({ 'mtime': l10n('sortOptionLastModified') as string })
          .addOptions({ 'ctime': l10n('sortOptionCreated') as string })
          .setValue(state.settings.sortBy || 'mtime')
          .onChange(value => {
            state.settings.setSortBy(value as Timestamp, state.files.loadFiles)
          })
      })
    
    // Show parent folder
    new Setting(containerEl)
      .setName(l10n('settingShowParentLabel'))
      .setDesc(l10n('settingShowParentDescription'))
      .addToggle(toggle => {
        toggle
          .setValue(state.settings.showParentFolder)
          .onChange(value => {
            state.settings.setShowParentFolder(value)
            state.files.loadFiles()
          })
      })
    
    // Show pinned files
    new Setting(containerEl)
      .setName(l10n('settingPinnedFilesLabel'))
      .setDesc(l10n('settingPinnedFilesDescription'))
      .addToggle(toggle => {
        toggle
          .setValue(state.settings.pinFiles)
          .onChange(value => {
            state.settings.setPinFiles(value)
            state.files.loadFiles()
          })
      })

    // Omitted paths
    new Setting(containerEl)
      .setName(l10n('settingOmittedPathsLabel'))
      .setDesc(l10n('settingOmittedPathsDescription'))
      .addTextArea((textArea) => {
        textArea.inputEl.setAttr('rows', 6)
        textArea
          .setPlaceholder('daily/*\n*.pdf\n*.{jpg,png,gif}')
          .setValue(state.settings.omittedPaths.join('\n'))
        textArea.inputEl.onblur = async (e: FocusEvent) => {
          const patterns = (e.target as HTMLInputElement).value
          const pathsListChanged = await state.settings.setOmittedPaths(patterns.split('\n'))
          if (pathsListChanged) {
            state.files.loadFiles()
          }
        }
      })

    // Donate
    mount(DonateOption, {
      target: containerEl
    })
  }
}