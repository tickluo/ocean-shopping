import WebStorageCache from 'web-storage-cache'
import { sessionConfig } from '../local/config.enum'

const sessionStorage = new WebStorageCache({
  storage: 'sessionStorage',
  exp: sessionConfig.Duration
})

const setSession = (key, value) => (sessionStorage.get(key)
  ? sessionStorage.replace(key, value)
  : sessionStorage.set(key, value))

const getSession = key => sessionStorage.get(key) || null

const extendSession = key => sessionStorage.touch(key, { exp: sessionConfig.Duration })

const deleteSession = key => sessionStorage.delete(key)

const replaceSession = (key, value) => sessionStorage.replace(key, value)

export {
  setSession,
  getSession,
  extendSession,
  deleteSession,
  replaceSession
}
