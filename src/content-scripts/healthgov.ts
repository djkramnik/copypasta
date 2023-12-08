export function healthGovScript() {
  console.log('IM treading lightly -- health gov edition')

  opportunisticallyInjectButton(injectHealthGovDom)

  function opportunisticallyInjectButton(
    inject: () => { stop: boolean },
    pause: number = 1000
    ) {
    console.log('no more couch surfing', inject)
    const { stop } = inject()
    if (stop) {
      return
    }
    setTimeout(
      () => opportunisticallyInjectButton(inject, pause),
      pause,
    )
  }

  function getDoTasks(ms = 1000) {
    return function doTasks(tasks: Array<() => ({})>) {
      return tasks.reduce((acc, task) => {
          return acc.then(() => {
            return new Promise(resolve => {
              setTimeout(() => {
                task()
                resolve()
              }, ms)
            })
          })
      }, Promise.resolve())
    }
  }

  function injectHealthGovDom() {
    const planTitleClassName = `.pet-c-plan-title__issuer`
    const planTitles = document.querySelectorAll(planTitleClassName)
    
    planTitles.forEach(el => {
      const button = document.createElement('button')
      button.innerHTML = 'Copy'
      // @ts-ignore
      button.style = 'margin-left: 24px'
      el.appendChild(button)
      button.addEventListener('click', (event) => {
        const searchResult = el?.parentNode?.parentNode ?? el
        const carrierName = 
          (searchResult.querySelector('.pet-c-plan-title__issuer')?.textContent ?? '')
          .replace('Copy', '')
        const planName = searchResult.querySelector('.pet-c-plan-title__name')?.textContent ?? ''
        const info = searchResult.querySelector('.pet-c-plan-title__info')
        const metalLevel = info?.querySelector('[aria-label="Metal Level"]')?.textContent ?? ''
        const planType = info?.querySelector('[aria-label="Plan type"]')?.textContent ?? ''
        const planId = info?.querySelector('[aria-label="Plan ID"]')?.textContent ?? ''
        const rating = info?.querySelector('.ds-c-icon--star ')?.parentNode?.querySelector('.ds-u-visibility--screen-reader')?.textContent ?? ''
        const premium = searchResult.querySelector(`[aria-labelledby="${planId}-premium-label"]`)?.textContent ?? ''
        const [
          ,
          deductibleEl,
          oopEl,
        ] = Array.from(searchResult.querySelectorAll('.pet-c-plan-cost-row .pet-c-plan__currency-container'))
        const benefits = Array.from(searchResult.querySelectorAll('.pet-c-plan-benefit-name'))
        const primaryCare = benefits.find(el => el.textContent === 'Primary care')
        const specialistCare = benefits.find(el => el.textContent === 'Specialist care')
        const emergencyRoom = benefits.find(el => el.textContent === 'Emergency room')
        const genericDrugs = benefits.find(el => el.textContent === 'Generic drugs')

        const result = {
          carrierName,
          planName,
          metalLevel,
          planType,
          planId,
          rating,
          premium,
          deductible: deductibleEl?.textContent ?? '',
          oop: oopEl?.textContent ?? '',
          primaryCare: primaryCare
            ? primaryCare.parentNode?.querySelector('.pet-c-plan-benefit-cost')?.textContent ?? ''
            : '',
          specialistCare: specialistCare
            ? specialistCare.parentNode?.querySelector('.pet-c-plan-benefit-cost')?.textContent ?? ''
            : '',
          emergencyRoom: emergencyRoom
            ? emergencyRoom.parentNode?.querySelector('.pet-c-plan-benefit-cost')?.textContent ?? ''
            : '',
          genericDrugs: genericDrugs
            ? genericDrugs.parentNode?.querySelector('.pet-c-plan-benefit-cost')?.textContent ?? ''
            : '',
        }
        console.log(JSON.stringify(result))
        chrome.storage.session.set({test: result})
      })
    })

    return { stop: false }
  }
}

