import {
  SET_ORDER_LIST,
  SET_DISPLAY_ORDER
} from '../mutation-types'

const state = {
  orderList: [],
  orderDetail: {}
}

const mutations = {
  [SET_ORDER_LIST] (state, list) {
    state.orderList = list
  },
  [SET_DISPLAY_ORDER] (state, data) {
    state.orderDetail = data
  }
}

export default {
  state,
  mutations
}
