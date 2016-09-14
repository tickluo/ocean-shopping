import Vue from 'vue'
import VueX from 'vuex'
import orders from './modules/order'
import cart from './modules/cart'
import app from './modules/app'

Vue.use(VueX)

export default new VueX.Store({
  modules: {
    app,
    cart,
    orders
  }
})

