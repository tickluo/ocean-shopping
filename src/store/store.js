import Vue from 'vue'
import VueX from 'vuex'
import order from './modules/order'
import cart from './modules/cart'

Vue.use(VueX)

export default new VueX.Store({
  module: {
    order, cart
  }
})

