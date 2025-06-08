import { SidebarNotesListPlugin } from '../Plugin.svelte'

export function getPlugin() {
  if (!SidebarNotesListPlugin.instance) {
    throw new Error('Plugin not initialized')
  }
  return SidebarNotesListPlugin.instance
}