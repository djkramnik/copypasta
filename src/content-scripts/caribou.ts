import { getDoTasks, opportunisticallyInjectButton } from "./utils"

const doTasks = getDoTasks()

export function caribouScript() {
  console.log('IM treading lightly -- caribou edition')
  // 
  opportunisticallyInjectButton(injectCaribouDom)
}

function injectCaribouDom() {
  console.log('injecting! caribou!')
  ;[1,2,3,4].forEach((col) => {
      
    const planNameInputsContainer = document.querySelector(`[data-testid="plan-option-table-{0,${col}}"]`)
    const buttonId = `paste-extension-data-${col}`
    
    if (amIOnTheRightPage(window.location.href) !== true) {
      return { stop: true }
    }
    if (!planNameInputsContainer || planNameInputsContainer.querySelector(`#${buttonId}`)) {
      return { stop: true }
    }
    
    // put a button there with the specific id
    const button = document.createElement('button')
    button.innerHTML = 'Paste'
    button.setAttribute('id', buttonId)
    // no it is not true
    // @ts-ignore
    button.style = [
      'margin-left:25px',
      'margin-top:10px',
      'border-radius:16px',
      'outline:none',
      'border:none',
      'cursor:pointer',
      'font-family:Eina04-Bold',
      'font-size:15px',
      'line-height:1.5',
      'color:rgb(1,15,22)',
      'background-color:rgb(221, 222, 223)',
      'min-height:30px',
      'padding:5px 15px',
      'border-radius:16px',
      'width:fit-content',
    ].join(';')
    button.addEventListener('click', () => {
      // @ts-ignore
      updatePlan(col, window['copypasta'].plan)
    })
    planNameInputsContainer.prepend(button)
  })
  return { stop: false }
}

function updatePlan(...args: any[]) {
  console.log('updating plan!', args)
}

function amIOnTheRightPage(url: string): boolean {
  const pathOk = /\/report-types\/\w+\/plan-picker\?type=marketplace/.test(url)
  if (!pathOk) {
    return false
  }
  return new URL(url).host.includes('caribouadvisors.com')
}
