import 'whatwg-fetch'
import config from '../../config/_base.config'
import { setSession, getSession } from '../services/storage.svc'
import { sessionConfig } from '../local/config.enum'

const url = config.url

/* const checkStatus = response => {
 if (response.status >= 200 && response.status < 300) {
 return response
 }
 throw new Error(response.statusText)
 }*/

const parseJSON = response => response.json()

export default {
  post: (params, model) => {
    const postModel = model || {}
    postModel.key = getSession(sessionConfig.Key)
    return fetch(url + params, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      /* return fetch(params, {
       method: 'POST',
       /!* credentials: 'include',*!/
       credentials: 'same-origin',
       headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json'
       },*/
      body: JSON.stringify(postModel)
    })
      .then(res => Promise.resolve(res))
      .then(parseJSON)
      .then(res => {
        if (!res.Success && res.Code === -2000) {
          setSession(sessionConfig.ErrorMsg, res.Message)
          window.location.href = '#!/error'
        }
        return Promise.resolve(res)
      })
  },
  local: (fileName) => fetch(`../asset/json/${fileName}`)
    .then(parseJSON)

}
