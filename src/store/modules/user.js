import {
  SET_DEFAULT_ADDRESS
} from '../mutation-types'

const state = {
  defaultAddress: {}
}

const mutations = {
  [SET_DEFAULT_ADDRESS] (state, address) {
    state.defaultAddress = address
  }
}

export default {
  state,
  mutations
}
