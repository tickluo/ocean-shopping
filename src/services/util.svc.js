const psl = require('../asset/libs/psl')
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

export const toBeNext = () => 'toBeNext'
