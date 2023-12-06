export type ScriptType = 'healthgov' | 'caribou'

export const matchUrlToScript = (url: string): ScriptType | null => {
  switch(true) {
    case isHealthGov(url):
      return 'healthgov'
    case isCaribou(url):
      return 'caribou'
  }
  return null
}

function isHealthGov(url: string): boolean {
  return url.startsWith('https://www.healthcare.gov/see-plans/#/plan/results')
}

function isCaribou(url: string): boolean {
  const pathOk = /\/report-types\/\w+\/plan-picker\?type=marketplace/.test(url)
  if (!pathOk) {
    return false
  }
  return new URL(url).host.includes('caribouadvisors.com')
}