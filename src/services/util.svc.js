const psl = require('psl')
/**
 * hostname:l.hostname,pathname:l.pathname
 */
export const getLocation = href => {
  const l = document.createElement('a')
  l.href = href
  return l
}

export const getLocalURL = () => {
  const location = getLocation(window.location.href)
  return `${location.protocol}//${location.hostname}${location.port ? `:${location.port}` : ''}`
}

export const toFloatFixed = (num, s) => {
  const times = Math.pow(10, s)
  let des = (num * times) + 0.5
  des = parseInt(des, 10) / times
  return `${des}`
}

export const parseDomain = (str) => {
  const hostname = getLocation(str).hostname
  return psl.parse(hostname).domain
}

export const numberUnique = arr => {
  const u = {}
  const a = []
  for (let i = 0, l = arr.length; i < l; ++i) {
    if (!{}.hasOwnProperty.call(u, arr[i])) {
      a.push(arr[i])
      u[arr[i]] = 1
    }
  }
  return a
}

export const getCurrency = abbr => {
  let currency = ''
  switch (abbr) {
    case 'USD':
      currency = '美元'
      break
    case 'JPY':
      currency = '日元'
      break
    case 'EUR':
      currency = '欧元'
      break
    case 'AUD':
      currency = '澳元'
      break
    case 'GBP':
      currency = '英镑'
      break
    case 'KRW':
      currency = '韩元'
      break
    case 'CNY':
      currency = '人民币'
      break
    default:
      currency = '美元'
      break
  }
  return currency
}
