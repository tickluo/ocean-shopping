import 'whatwg-fetch'
import config from '../../config/_base.config'

const url = config.url

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  throw new Error(response.statusText)
}

const parseJSON = response => response.json()

export default {
  post: (params, model) => fetch(url + params, {
    method: 'POST',
    /* credentials: 'include',*/
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: JSON.stringify(model)
  }).then(checkStatus)
    .then(parseJSON)
}
/* headers: {
 'Content-Type': 'application/x-www-form-urlencoded'
 },*/
