import {
  SET_APP_CURRENCY,
  GEN_PAY
} from '../mutation-types'

const state = {
  Currency: {},
  genPay: false
}

const mutations = {
  [SET_APP_CURRENCY] (state, currency) {
    state.Currency = currency
  },
  [GEN_PAY] (state, toggle) {
    state.genPay = toggle
  }
}

export default {
  state,
  mutations
}
