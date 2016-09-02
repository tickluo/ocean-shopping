import { ADD_TO_CART, RECEIVE_SHOPPING_INFO } from '../mutation-types'

const getters = {
  shopping: state => {
    return state.shopping || {}
  }
}

const state = {}

const mutations = {
  [ADD_TO_CART] (state, productId) {
    state.all.find(p => p.id === productId).inventory--
  },
  [RECEIVE_SHOPPING_INFO] (state, shopping) {
    state.shopping = shopping
  }
}

export default {
  getters,
  state,
  mutations
}

