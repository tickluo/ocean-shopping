import Vue from 'vue'
import config from '../../config/_base.config'

const url = config.url

export default {
  post: (params, model) => Vue.http.post(url + params, model, [])
}
