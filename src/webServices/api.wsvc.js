import config from '../../config/_base.config'
import Vue from 'vue'

const url = config.url

export default {
  post: (params, model) => {
    return Vue.http.post(url + params, model, [])
  }
}
