<script lang="ts">
  import FileRowTitle from './FileRowTitle.svelte'
  import state from '../../state'
  import type { File } from '../../types'
  import FileRowFileSnippet from './FileRowFileSnippet.svelte';
  import { FileRowEvents } from './FileRowEvents.svelte';
  import FileRowParentFolder from './FileRowParentFolder.svelte';
  import FileRowPinFiles from './FileRowPinFiles.svelte';

  type Props = {
    file: File,
    rowEl: HTMLElement
  }

  let {
    file,
    rowEl = $bindable()
  }: Props = $props()

  const { settings } = state

  const onAuxClick = (event: MouseEvent) => FileRowEvents.onAuxClick(event, file)
  const onClick = (event: MouseEvent) => FileRowEvents.onClick(event, file)
  const onContextMenu = (event: MouseEvent) => FileRowEvents.onContextMenu(event, file)
  const onDragStart = (event: DragEvent) => FileRowEvents.onDragStart(event, file)
  const onKeyUp = (event: KeyboardEvent) => FileRowEvents.onKeyUp(event, file)
</script>

<div
  aria-selected="{file.active}"
  bind:this={rowEl}
  class="row"
  class:active={file.active}
  class:has-focus={file.active}
  data-path="{file.tfile.path}"
  draggable="true"
  role="option"
  tabindex="0"
  onclick={onClick}
  oncontextmenu={onContextMenu}
  onauxclick={onAuxClick}
  ondragstart={onDragStart}
  onkeyup={onKeyUp}
>
  <div class="file-details">
    <FileRowTitle {file} />
    <div class="file-contents">
      <span class="file-date">
        {new Date(file.tfile.stat[settings.sortBy]).toLocaleDateString()}
      </span>
      <FileRowFileSnippet {file} />
    </div>
    <FileRowParentFolder {file} />
  </div>
  <FileRowPinFiles {file} />
</div>

<style lang="scss">
  @use '../global.scss' as *;

  // Row
  .row {
    justify-content: space-between;
    align-items: center;
    position: unset;
    display: flex;
    border-radius: var(--radius-s);
    font-size: var(--nav-item-size);
    line-height: var(--line-height-tight);
    font-weight: var(--nav-item-weight);
    margin-bottom: var(--size-2-1);
    padding: var(--nav-item-padding);
    scroll-margin: 32px;
    cursor: var(--cursor);
  }
  .row:hover {
    background-color: var(--nav-item-background-hover);
  }
  .row.active {
    background-color: var(--text-selection);
  }

  // Row Contents
  .file-details {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    overflow-wrap: anywhere;
    text-wrap: nowrap;
  }
  .file-contents {
    @include text-overflow-styles;
  }
  .file-date {
    color: var(--text-muted);
  }
</style>