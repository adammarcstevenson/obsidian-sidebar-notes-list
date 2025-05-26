<script lang="ts">
  import { Menu, type TFile } from 'obsidian'

  import { l10n } from '../l10n/l10n'
  import ObsidianIcon from './ObsidianIcon.svelte'
  import state from '../state'
  import type { ActionMenuItem, Timestamp } from '../types'
  import { getPlugin } from '../utils'

  const menu: ActionMenuItem[] = [
    {
      ariaLabel: l10n('newNoteLabel'),
      iconId: 'edit',
      onClickHandler: async () => {
        const activeFilePath = getPlugin().app.workspace.getActiveFile()?.path || ''
        const newFileParentFolder = getPlugin().app.fileManager.getNewFileParent(activeFilePath)
        const createFile = async (num = 0) => {
          const filePath = num === 0 ? `${newFileParentFolder.path}/${l10n('untitledFilename')}.md` : `${newFileParentFolder.path}/${l10n('untitledFilename')} ${num}.md`
          let file: TFile
          try {
            file = await getPlugin().app.vault.create(filePath, '')
          } catch {
            file = await createFile(num + 1)
          }
          return file
        }
        const newFile = await createFile()
        const leaf = getPlugin().app.workspace.getLeaf('tab')
        await leaf.openFile(newFile)
        console.log(leaf.view.containerEl)
        const titleContainerEl = leaf.view.containerEl.querySelector('div.inline-title') as HTMLElement
        if (!titleContainerEl) return
        titleContainerEl.focus()
        window.getSelection()?.selectAllChildren(titleContainerEl)
      }
    },
    {
      ariaLabel: l10n('searchLabel'),
      iconId: 'search',
      onClickHandler: () => {
        state.searchInput.showSearch()
      }
    },
    {
      ariaLabel: l10n('changeSortOrderLabel'),
      iconId: 'sort-desc',
      onClickHandler: (event: MouseEvent) => {
        const menu = new Menu()
        const changeSortOrder = (sortBy: Timestamp) => {
          state.settings.setSortBy(sortBy, state.files.loadFiles)
        }
        menu.addItem((item) =>
        item
          .setTitle(l10n('sortOptionLastModified'))
          .setChecked(state.settings.sortBy === 'mtime')
          .onClick(() => { changeSortOrder('mtime') })
        )
        menu.addItem((item) =>
        item
          .setTitle(l10n('sortOptionCreated'))
          .setChecked(state.settings.sortBy === 'ctime')
          .onClick(() => { changeSortOrder('ctime') })
        )
        menu.showAtMouseEvent(event)
      }
    }
  ]
</script>

<div class="action-menu nav-buttons-container">
  {#each menu as btn}
    <button
      class="action-menu-btn clickable-icon nav-action-button"
      aria-label="{btn.ariaLabel}"
      on:click={btn.onClickHandler}
    >
      <ObsidianIcon
        iconId={btn.iconId}
      />
    </button>
  {/each}
</div>

<style>
  .action-menu {
    margin: var(--size-4-2);
    margin-bottom: max(var(--size-4-2), var(--safe-area-inset-bottom));
  }
</style>