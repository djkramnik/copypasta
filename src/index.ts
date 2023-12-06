import { 
  matchUrlToScript
} from './util'

type TabUpdateHandler = (tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => void

const handleTabUpdate: TabUpdateHandler = (
  tabId,
  changeInfo,
  tab,
) => {
  // if the changeInfo is complete, match the url to the script and load script if any
  console.log('changeInfo', tabId, changeInfo)
  console.log('matche?', matchUrlToScript(tab.url ?? ''))
  
}

chrome.tabs.onUpdated.addListener(handleTabUpdate)

function contentScript() {
  console.log('IM RELOADED!!!')
  // if the status is 
}

