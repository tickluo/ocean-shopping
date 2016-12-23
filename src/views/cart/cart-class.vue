<template>
  <section class="shopping_con_box" v-if="showShop">
    <h3 class="shopping_cart_tit">
      <c-checkbox :selected="toggle" @click="changeToggle">
      </c-checkbox>
      <img class="shop_brand_logo" :src="logos[shopLogo]" alt="">
      <span class="shop_brand_name long_title">{{title}}</span>
      <div class="tran_fee">
        <p>总运费</p>
        <p>{{showTip?order.selected[this.shop_id].Rule.CurrencySign:'RMB'}}
          {{showTip?order.selected[this.shop_id].Rule.ExpensesPrice:expressFee}}</p>
      </div>
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
  import { toFloatFixed } from '../../services/util.svc'

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
        currency: state => state.app.appPersist.Currency,
        removeList: state => state.cart.removeList
      },
      actions: {
        selectShop: cart.selectShop
      }
    },
    computed: {
      selected () {
        return this.order.selected[this.shop_id]
      },
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
        return this.selected.shopping.length > 0 && (
            this.selected.RulePrice === ExpensesType.Must
            || this.selected.RulePrice === ExpensesType.NotFull
          )
      },
      expressFee () {
        if (this.selected.shopping.length > 0) {
          this.list.forEach(item => {
            if (this.selected.shopping.includes(item.Id)) {
              return toFloatFixed(item.ExpressFee * this.rate, 2)
            }
          })
        }
        return 0
      },
      tip () {
        const rule = this.selected.Rule
        if (rule.ExpensesType === ExpensesType.NotFull) {
          if (rule.CurrencyCode === 'JPY') {
            return `该网站订单未满${rule.LimitPrice}日元,需收取${rule.ExpensesPrice}日元商家运费`
          }
          return `该网站订单未满${rule.CurrencySign + rule.LimitPrice},需收取${rule.CurrencySign +
          rule.ExpensesPrice}商家运费`
        }
        if (rule.ExpensesType === ExpensesType.Must) {
          if (rule.CurrencyCode === 'JPY') {
            return `该网站订单需收取${rule.ExpensesPrice}日元商家运费`
          }
          return `该网站订单需收取${rule.CurrencySign + rule.ExpensesPrice}商家运费`
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
