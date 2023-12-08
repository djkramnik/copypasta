export const sleep = (ms: number = 1000) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

export function getDoTasks(ms = 1000) {
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

export function opportunisticallyInjectButton(
  inject: () => { stop: boolean },
  pause: number = 1000
  ) {
  const { stop } = inject()
  if (stop) {
    return
  }
  setTimeout(
    () => opportunisticallyInjectButton(inject, pause),
    pause,
  )
}