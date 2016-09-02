<template>
  <div>
    <v-header title="title"></v-header>
    <order-shopping-info></order-shopping-info>
    <exchange-rate></exchange-rate>
    <shopping-cost></shopping-cost>
    <shopping-sku></shopping-sku>
    <shopping-footer></shopping-footer>
  </div>
</template>

<script>
  import '../../asset/css/main.css'
  import { ShoppingCost, OrderShoppingInfo, ExchangeRate, VHeader, ShoppingSku, ShoppingFooter } from '../../components'
  import { getShopping } from '../../store/action'
  import order from '../../store/getter'
  import store from '../../store/store'

  export default{
    components: {
      VHeader, OrderShoppingInfo, ExchangeRate, ShoppingSku, ShoppingFooter, ShoppingCost
    },
    vuex: {
      getters: {
        shopping: order.shopping
      },
      actions: {
        getShopping
      }
    },
    route: {
      data(transition) {
        return this.getShopping(store, '').catch(res => {
          console.log(res)
          transition.abort()
        })
      },
      waitForData: true
    },
    ready(){
    }
  }
</script>
