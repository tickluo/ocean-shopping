import 'whatwg-fetch'
/* import config from '../../config/_base.config'*/
import store from '../store/store'
import { app } from '../store/action'

/* const url = config.url*/

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  throw new Error(response.statusText)
}

const parseJSON = response => response.json()

export default {
  post: (params, model, needLoading = false) => {
    if (needLoading) app.setLoading(store, needLoading)
    return fetch(params, {
      /* return fetch(url + params, {
       method: 'POST',
       headers: {
       'Content-Type': 'application/x-www-form-urlencoded'
       },*/
      method: 'POST',
      /* credentials: 'include',*/
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(model)
    }).then(res => {
      if (needLoading) {
        app.setLoading(store, false)
        app.setSubmitLoading(store, false, '')
      }
      return Promise.resolve(res)
    })
      .then(checkStatus)
      .then(parseJSON)
  },
  local: (fileName) => fetch(`../asset/json/${fileName}`)
    .then(checkStatus)
    .then(parseJSON)
}
