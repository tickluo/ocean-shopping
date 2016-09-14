import { SET_APP_CURRENCY } from '../mutation-types'

const state = {
  Currency: {}
}

const mutations = {
  [SET_APP_CURRENCY] (state, currency) {
    state.Currency = currency
  }
}

export default {
  state,
  mutations
}
