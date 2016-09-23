const psl = require('psl')
/**
 * hostname:l.hostname,pathname:l.pathname
 */
export const getLocation = href => {
  const l = document.createElement('a')
  l.href = href
  return l
}

export const parseDomain = (str) => {
  const hostname = getLocation(str).hostname
  return psl.parse(hostname).domain
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
