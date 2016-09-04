import { ADD_TO_CART, RECEIVE_SHOPPING_INFO } from '../mutation-types'

const states = {
  shopping: {}
}

const mutations = {
  [ADD_TO_CART] (state, productId) {
    state.all.find(p => p.id === productId).inventory--
  },
  [RECEIVE_SHOPPING_INFO] (state, shopping) {
    state.shopping = shopping
  }
}

export default {
  states,
  mutations
}

