import { 
  getDoTasks,
  opportunisticallyInjectButton
} from "./utils"

const doTasks = getDoTasks()

export function healthGovScript() {
  console.log('IM treading lightly -- health gov edition')

  opportunisticallyInjectButton(injectHealthGovDom)
}

function injectHealthGovDom() {
  console.log('injecting! healthgov!')
  return { stop: true }
}