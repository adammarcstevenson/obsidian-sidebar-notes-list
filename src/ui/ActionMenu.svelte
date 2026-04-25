<script lang="ts">
  import { Menu, type TFile } from 'obsidian'

  import { l10n } from '../l10n/l10n'
  import LoadingSpinner from './LoadingSpinner.svelte'
  import ObsidianIcon from './ObsidianIcon.svelte'
  import state from '../state'
  import type { ActionMenuItem, Timestamp } from '../types'
  import { getPlugin } from '../utils'

  const menu: ActionMenuItem[] = [
    {
      ariaLabel: l10n('newNoteLabel') as string,
      iconId: 'edit',
      onClickHandler: async () => {
        const activeFilePath = getPlugin().app.workspace.getActiveFile()?.path || ''
        const newFileParentFolder = getPlugin().app.fileManager.getNewFileParent(activeFilePath)
        const createFile = async (num = 0): Promise<TFile> => {
          if (num > 100) throw new Error('Failed to create new file')
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
        await leaf.openFile(newFile, {
          eState: { rename: 'all' }
        })
        const titleContainerEl = leaf.view.containerEl.querySelector('div.inline-title') as HTMLElement
        if (!titleContainerEl) return
        titleContainerEl.focus()
        window.getSelection()?.selectAllChildren(titleContainerEl)
      }
    },
    {
      ariaLabel: l10n('searchLabel') as string,
      iconId: 'search',
      isActive: () => state.searchInput.isVisible,
      onClickHandler: () => {
        state.searchInput.toggle()
      }
    },
    {
      ariaLabel: l10n('changeSortOrderLabel') as string,
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
    },
    {
      ariaLabel: 'Refresh',
      iconId: 'refresh-cw',
      onClickHandler: () => {
        state.files.loadFiles()
      },
      showOnlyInDebugMode: true
    }
  ].filter(item => {
     const isDebugMode = localStorage.getItem('sidebar-notes-list-debug') === 'true'
    return isDebugMode || !item.showOnlyInDebugMode
  })
</script>

<div
  class="action-menu"
  class:phone={state.platform.isPhone}
>
  <LoadingSpinner />
  <div
    class="nav-buttons-container"
    class:not-phone={!state.platform.isPhone}
  >
    {#each menu as btn}
      <button
        class="action-menu-btn clickable-icon nav-action-button"
        class:is-active={btn.isActive?.()}
        aria-label="{btn.ariaLabel}"
        on:click={btn.onClickHandler}
      >
        <ObsidianIcon
          iconId={btn.iconId}
        />
      </button>
    {/each}
  </div>
  <div></div> <!-- Empty right column for balance using grid layout -->
</div> 

<style>
  .action-menu {
    z-index: 2;
    margin: var(--size-4-2);
    position: relative;
    &.phone {
      margin: inherit;
      position: inherit;
    }
  }
  .nav-buttons-container.not-phone {
    position: inherit;
  }
</style>