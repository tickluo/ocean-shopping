<template>
  <section class="shopping_con_box" v-if="showShop">
    <h3 class="shopping_cart_tit">
      <c-checkbox :selected="toggle" @click="changeToggle">
      </c-checkbox>
      <img class="shop_brand_logo" :src="logos[shopLogo]" alt="">
      <span class="shop_brand_name">{{title}}</span>
    </h3>
    <div class="shopping_tips bg_fb" v-if="showTip">
      <p class="font_28">{{tip}}</p>
    </div>
    <cart-item v-for="item in list"
               :shop_id="shop_id"
               :item="item"
               :rate="rate">
    </cart-item>
  </section>
</template>

<script>
  import cartItem from './cart-item.vue'
  import logos from '../../asset/web_logo'
  import { CCheckbox } from '../../components'
  import { cart } from '../../store/action'
  import { ExpensesType } from '../../local/config.enum'

  export default{
    props: [
      'title',
      'list',
      'rule',
      'shop_id',
      'rate',
      'logo'
    ],
    data(){
      return {
        logos
      }
    },
    vuex: {
      getters: {
        order: state => state.cart.order,
        currency: state => state.app.Currency,
        removeList: state => state.cart.removeList
      },
      actions: {
        selectShop: cart.selectShop
      }
    },
    computed: {
      shopLogo () {
        if (!this.logo && this.logo === '') return ''
        let logoArr = this.logo.split('/')
        return logoArr[logoArr.length - 1]
      },
      showShop () {
        return !this.list.every(item => this.removeList.includes(item.Id)) && this.order.selected
      },
      toggle () {
        return this.order.selected[this.shop_id].selectShop
      },
      serviceRate (){
        return this.currency.ServiceCoefficient || 0
      },
      showTip () {
        return this.order.selected[this.shop_id].shopping.length > 0 && (
            this.order.selected[this.shop_id].RulePrice === ExpensesType.Must
            || this.order.selected[this.shop_id].RulePrice === ExpensesType.NotFull
          )
      },
      tip () {
        if (this.order.selected[this.shop_id].Rule.ExpensesType === ExpensesType.NotFull) {
          if (this.order.selected[this.shop_id].Rule.CurrencyCode === 'JPY') {
            return `该网站订单未满${this.order.selected[this.shop_id].Rule.LimitPrice}日元,
            需收取${this.order.selected[this.shop_id].Rule.ExpensesPrice}日元商家运费`
          }
          return `该网站订单未满
          ${this.order.selected[this.shop_id].Rule.CurrencySign +
          this.order.selected[this.shop_id].Rule.LimitPrice},
            需收取
            ${this.order.selected[this.shop_id].Rule.CurrencySign +
          this.order.selected[this.shop_id].Rule.ExpensesPrice}
          商家运费`
        }
        if (this.order.selected[this.shop_id].Rule.ExpensesType === ExpensesType.Must) {
          if (this.order.selected[this.shop_id].Rule.CurrencyCode === 'JPY') {
            return `该网站订单需收取${this.order.selected[this.shop_id].Rule.ExpensesPrice}
            日元商家运费`
          }
          return `该网站订单需收取
          ${this.order.selected[this.shop_id].Rule.CurrencySign +
          this.order.selected[this.shop_id].Rule.ExpensesPrice}
          商家运费`
        }
      }
    },
    components: {
      cartItem,
      CCheckbox
    },
    methods: {
      changeToggle () {
        return this.selectShop(!this.toggle, this.shop_id, this.serviceRate)
      }
    }
  }
</script>
