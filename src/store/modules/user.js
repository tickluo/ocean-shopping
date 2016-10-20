import {
  SET_DEFAULT_ADDRESS,
  SET_SELECT_ADDRESS,
  SET_PAY_ORDER,
  SET_MODIFY_ADDRESS
} from '../mutation-types'

const state = {
  defaultAddress: {},
  modifyAddress: {},
  selectAddress: 0,
  payOrder: {}
}

const mutations = {
  [SET_DEFAULT_ADDRESS] (state, address) {
    state.defaultAddress = address
  },
  [SET_MODIFY_ADDRESS] (state, address) {
    state.modifyAddress = address
  },
  [SET_SELECT_ADDRESS] (state, id) {
    state.selectAddress = id
  },
  [SET_PAY_ORDER] (state, pay) {
    state.payOrder = pay
  }
}

export default {
  state,
  mutations
}
