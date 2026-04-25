import Files from './Files.svelte'
import InfiniteScroll from './InfiniteScroll.svelte'
import List from './List.svelte'
import LoadingFiles from './LoadingFiles.svelte'
import Platform from './Platform.svelte'
import PluginData from './PluginData.svelte'
import SearchInput from './SearchInput.svelte'
import Settings from './Settings'

const pluginData = new PluginData()
const settings = new Settings(pluginData)
const searchInput = new SearchInput()
const loadingFiles = new LoadingFiles()
const infiniteScroll = new InfiniteScroll()
const platform = new Platform()
const files = new Files(loadingFiles, pluginData, settings)
const list = new List(files, infiniteScroll, searchInput)

export default {
  infiniteScroll,
  files,
  list,
  loadingFiles,
  platform,
  pluginData,
  searchInput,
  settings,
}
