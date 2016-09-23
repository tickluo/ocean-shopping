<template>
  <div class="mar_bot_13 bg_e6">

    <article class="shopping_list_wrap">
      <cart-class v-for="item in cartList"
                  :title="item.Title"
                  :shop_id="$index"
                  :list="item.GrabAttrs"
                  :rule="item.Rule">
      </cart-class>
    </article>

    <section class="sec_footer">
      <c-checkbox :selected="toggle" @click="changeToggle">
      </c-checkbox>
      <span class="sel_all_txt">全选</span>
      <div class="total_money_wrap">
        <h4 class="money">RMB {{totalPrice}}</h4>
        <a href="#" class="shipment_illustrate"> <img :src="images.circleTips" alt="">国际运费说明 </a>
      </div>
      <a @click.prevent="nextStep" class="calc_btn" :class="{calc_btn_disabled:hasSelected}">
        结算
      </a></section>

    <v-footer></v-footer>
  </div>
</template>
<script>
  import imageModule from '../../asset/images'
  import cartClass from './cart-class.vue'
  import VFooter from '../layout/v-order-footer.vue'
  import VLoading from '../../components/v-loading.vue'
  import { CCheckbox } from '../../components'
  import { cart } from '../../store/action'

  export default{
    name: 'cartIndex',
    data () {
      let images = imageModule
      return {
        images
      }
    },
    vuex: {
      getters: {
        cartList: state =>state.cart.cartList,
        toggle: state => state.cart.order.selectAll,
        selectedTotalPrice: state => state.cart.shoppingTotalPrice,
        selectedShopping: state => state.cart.order.selected
      },
      actions: {
        getCartList: cart.getCartList,
        selectAll: cart.selectAll,
        setShoppingRate: cart.setShoppingRate
      }
    },
    computed: {
      hasSelected () {
        return this.selectedShopping ? this.selectedShopping.every(item => item.shopping.length === 0) : false
      },
      totalPrice () {
        return this.selectedTotalPrice ? parseFloat(this.selectedTotalPrice).toFixed(2) : 0
      }
    },
    methods: {
      getExchangeRate: cart.getExchangeRate,
      changeToggle () {
        return this.selectAll(!this.toggle)
      },
      nextStep () {
        if (!this.hasSelected) {
          return this.$router.go({ name: 'company' })
        }
        return false
      }
    },
    components: {
      cartClass,
      CCheckbox,
      VFooter,
      VLoading
    },
    route: {
      data({ to: { params: { key } } }){
        return this.getCartList(key)
          .then(()=> {
            return this.getExchangeRate(key, '')
          })
          .then((data)=> {
            return this.setShoppingRate(key, data.List)
          })
          .then(()=> {
            this.selectAll(true)
          })
          .catch(err => {

          })
      },
      waitForData: true
    }
  }
</script>
