
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
    console.log('injecting! healthgov!')
    return { stop: true }
  }
}

