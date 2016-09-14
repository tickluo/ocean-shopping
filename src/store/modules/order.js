import {
  SET_ORDER_LIST
} from '../mutation-types'

const state = {
  orderList: []
}

const mutations = {
  [SET_ORDER_LIST] (state, list) {
    state.orderList = list
  }
}

export default {
  state,
  mutations
}
