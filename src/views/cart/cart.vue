<template>
  <div class="bg_e6">
    <v-loading v-if="$loadingRouteData"></v-loading>
    <div v-if="!$loadingRouteData" class="mar_bot_10" v-fix-bottom="ss">
      <article class="shopping_list_wrap" v-if="countries.length > 0 && rates.length > 0">
        <cart-class v-for="item in cartList"
                    :title="item.Title"
                    :shop_id="$index"
                    :list="item.GrabAttrs"
                    :rule="item.Rule"
                    :logo="shopLogo(item.GrabAttrs[0])"
                    :rate="shopRate(item.GrabAttrs[0])">
        </cart-class>
      </article>
      <empty v-if="isEmpty" :e-text="eText" :e-src="images.eCart"></empty>
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
  import VLoading from '../../components/v-loading.vue'
  import Empty from '../../components/empty.vue'
  import { CCheckbox } from '../../components'
  import { timeStamp } from '../../local/config.enum'
  import { toFloatFixed } from '../../services/util.svc'
  import { getShopInfo } from '../../services/match.svc'
  import { app, cart } from '../../store/action'

  export default{
    name: 'cartIndex',
    data () {
      return {
        images,
        eText: '购物车空空如也'
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
        currency: state => state.app.appPersist.Currency,
        removeList: state => state.cart.removeList
      },
      actions: {
        getCartList: cart.getCartList,
        selectAll: cart.selectAll,
        setShoppingRate: cart.setShoppingRate,
        clearRemoveList: cart.clearRemoveList,
        clearNoCountList: cart.clearNoCountList,
        addToNoCount: cart.addToNoCount
      }
    },
    computed: {
      isEmpty () {
        let shoppingLength = 0
        this.cartList.forEach(item => {
          shoppingLength += item.GrabAttrs.length
        })
        return this.cartList.length === 0 || shoppingLength === this.removeList.length
      },
      hasSelected () {
        return this.selectedShopping
        && this.selectedShopping.length > 0
        && this.totalPrice !== 0
        && !this.isEmpty ? this.selectedShopping.every(item => item.shopping.length === 0) : true
      },
      totalPrice () {
        return this.selectedTotalPrice ? toFloatFixed((this.selectedTotalPrice), 2) : 0
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
      VFooter,
      VLoading,
      Empty
    },
    route: {
      data () {
        this.clearRemoveList()
        this.clearNoCountList()
        return this.getCartList()
          .then(() => this.getExchangeRate(''))
          .then((data) => this.setShoppingRate(data.List))
          .then(()=> {
            const now = new Date().getTime()
            this.cartList.forEach(list => {
              list.GrabAttrs.forEach(shopping => {
                if ((now - Date.parse(new Date(shopping.UpdateTime))) > timeStamp.cart) {
                  this.addToNoCount(shopping.Id)
                }
              })
            })
            return this.selectAll(true, this.serviceRate)
          })
      }
    }
  }
</script>
