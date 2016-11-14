<template>
  <div class="bg_e6">
    <div class="mar_bot_21"  v-fix-bottom="ss">
      <article  class="shopping_list_wrap" v-if="countries.length > 0 && rates.length > 0">
        <cart-class v-for="item in cartList"
                    :title="item.Title"
                    :shop_id="$index"
                    :list="item.GrabAttrs"
                    :rule="item.Rule"
                    :logo="shopLogo(item.GrabAttrs[0])"
                    :rate="shopRate(item.GrabAttrs[0])">
        </cart-class>
      </article>
    </div>
    <section class="sec_footer" v-disable-tap>
      <c-checkbox :selected="toggle" @click="changeToggle">
      </c-checkbox>
      <span class="sel_all_txt">全选</span>
      <div class="total_money_wrap">
        <h4 class="money">RMB {{totalPrice}}</h4>
        <a class="shipment_illustrate" v-link="{name:'freight'}">
          <img :src="images.circleTips" alt="">国际运费说明
        </a>
      </div>
      <a @click.prevent="nextStep" class="calc_btn" :class="{calc_btn_disabled:hasSelected}">
        结算
      </a>
    </section>

    <v-footer v-disable-tap></v-footer>
  </div>
</template>
<script>
  import images from '../../asset/images'
  import cartClass from './cart-class.vue'
  import VFooter from '../layout/v-order-footer.vue'
  import { CCheckbox } from '../../components'
  import { getShopInfo } from '../../services/match.svc'
  import { cart } from '../../store/action'

  export default{
    name: 'cartIndex',
    data () {
      return {
        images
      }
    },
    vuex: {
      getters: {
        cartList: state =>state.cart.cartList,
        toggle: state => state.cart.order.selectAll,
        selectedTotalPrice: state => state.cart.shoppingTotalPrice,
        selectedShopping: state => state.cart.order.selected,
        countries: state => state.cart.countries,
        rates: state => state.cart.rates,
        currency: state => state.app.Currency
      },
      actions: {
        getCartList: cart.getCartList,
        selectAll: cart.selectAll,
        setShoppingRate: cart.setShoppingRate
      }
    },
    computed: {
      hasSelected () {
        return this.selectedShopping && this.selectedShopping.length > 0
          ? this.selectedShopping.every(item => item.shopping.length === 0)
          : true
      },
      totalPrice () {
        return this.selectedTotalPrice ? parseFloat(this.selectedTotalPrice).toFixed(2) : 0
      },
      serviceRate (){
        return this.currency.ServiceCoefficient || 0
      }
    },
    methods: {
      getExchangeRate: cart.getExchangeRate,
      changeToggle () {
        return this.selectAll(!this.toggle, this.serviceRate)
      },
      nextStep () {
        if (!this.hasSelected) {
          return this.$router.go({ name: 'company' })
        }
        return false
      },
      shopRate (shop) {
        const rateTemp = getShopInfo(this.rates, shop)
        return rateTemp
          ? rateTemp.Rate
          : this.countries.find(item => item.Id === shop.CountryId).Rate
      },
      shopLogo (shop) {
        const rateTemp = getShopInfo(this.rates, shop)
        return rateTemp ? rateTemp.Logo : ''
      }
    },
    components: {
      cartClass,
      CCheckbox,
      VFooter
    },
    route: {
      data ({ to: { params: { key } } }) {
        return this.getCartList(key)
          .then(() => this.getExchangeRate(key, ''))
          .then((data) => this.setShoppingRate(key, data.List))
          .then(()=> {
            return this.selectAll(true, this.serviceRate)
          })
      }
    }
  }
</script>
