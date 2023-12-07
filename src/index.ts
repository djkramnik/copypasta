import { 
  matchUrlToScript,
  ScriptType
} from './util'

type TabUpdateHandler = (tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => void

const scriptTypeToFunction: Record<ScriptType, (...args: any[]) => void> = {
  'healthgov': healthGovScript,
  'caribou': caribouScript,
}

const handleTabUpdate: TabUpdateHandler = (
  tabId,
  changeInfo,
  tab,
) => {
  console.log('changeInfo', tabId, changeInfo, tab)
  console.log('matche?', matchUrlToScript(tab.url ?? ''))
  if (changeInfo.status !== 'complete') {
    return
  }
  // if the changeInfo is "complete", match the url to the script and load script if any
  const matchedScript = matchUrlToScript(tab.url ?? '')
  if (!matchedScript) {
    return
  }
  console.log('le chien', scriptTypeToFunction[matchedScript])
  chrome.scripting.executeScript({
    target: {
      tabId,
    },
    func: scriptTypeToFunction[matchedScript]
  })
}

chrome.tabs.onUpdated.addListener(handleTabUpdate)

function healthGovScript() {
  console.log('IM RELOADED! health gov edition')
}

function caribouScript() {
  console.log('IM RELOADED!!! caribou edition')
}
