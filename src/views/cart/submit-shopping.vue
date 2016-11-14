<template>
  <div>
    <section class="shopping_con_box" v-for="shop in shoppingList">
      <h3 class="shopping_cart_tit">
        <img class="shop_brand_logo" :src="logos[shop.logo]" alt="">
        <span class="shop_brand_name">{{shop.Title}}</span>
      </h3>
      <div class="shopping_list_block" v-for="shopping in shop.GrabAttrs">
        <display-shopping :cover="shopping.Cover"
                          :name="shopping.Name"
                          :price="afterRatePrice(shop.rate,shopping.OriginalPrice)"
                          :quantity="shopping.Quantity"
                          :sku="shopping.Sku">
        </display-shopping>
      </div>
    </section>
  </div>
</template>

<script>
  import logos from '../../asset/web_logo'
  import DisplayShopping from '../layout/display-shopping.vue'
  import { parseDomain, toFloatFixed } from '../../services/util.svc'
  import { getShopInfo } from '../../services/match.svc'

  export default{
    data(){
      return {
        logos
      }
    },
    components: {
      DisplayShopping
    },
    vuex: {
      getters: {
        order: state => state.cart.order,
        cartList: state => state.cart.cartList,
        rates: state => state.cart.rates,
        removeList: state => state.cart.removeList,
        countries: state => state.cart.countries,
        currency: state => state.app.Currency
      }
    },
    computed: {
      serviceRate (){
        return this.currency.ServiceCoefficient || 0
      },
      shoppingList () {
        if(!this.order.selected || this.order.selected.length === 0) return []
        if (this.order.selectAll) {
          return this.cartList.map((item) => {
            const rateTemp = getShopInfo(this.rates, item.GrabAttrs[0])
            const rate = rateTemp
              ? rateTemp.Rate
              : this.countries.find(country => country.Id === item.GrabAttrs[0].CountryId).Rate
            const logo = rateTemp ? rateTemp.Logo : ''
            return {
              Title: item.Title,
              GrabAttrs: item.GrabAttrs.filter(shopping =>
                !this.removeList.includes(shopping.Id)
              ),
              rate,
              logo: this.shopLogo(logo)
            }
          })
        }
        let list = []
        this.order.selected.forEach((item, index) => {
          const rateTemp = getShopInfo(this.rates, this.cartList[index].GrabAttrs[0])
          const rate = rateTemp
            ? rateTemp.Rate
            : this.countries.find(item => item.Id === this.cartList[index].GrabAttrs[0].CountryId).Rate
          const logo = rateTemp ? rateTemp.Logo : ''
          if (!item.selectShop && item.shopping.length !== 0) {
            list.push({
              GrabAttrs: []
            })
            item.shopping.forEach(shopping => {
              if (!this.removeList.includes(shopping.Id)) {
                list[list.length - 1].Title = this.cartList[index].Title
                list[list.length - 1].GrabAttrs
                  .push(this.cartList[index].GrabAttrs.find(cartShopping => cartShopping.Id === shopping))
                list[list.length - 1].rate = rate
                list[list.length - 1].logo = this.shopLogo(logo)
              }
            })
          }
          if (item.selectShop) {
            list.push({
              GrabAttrs: []
            })
            list[list.length - 1].Title = this.cartList[index].Title
            list[list.length - 1].GrabAttrs = this.cartList[index].GrabAttrs
              .filter(shopping => !this.removeList.includes(shopping.Id))
            list[list.length - 1].rate = rate
            list[list.length - 1].logo = this.shopLogo(logo)
          }
        })
        return list
      }
    },
    methods: {
      shopLogo (logo) {
        if (!logo || logo === '') return ''
        let logoArr = logo.split('/')
        return logoArr[logoArr.length - 1]
      },
      afterRatePrice (rate, OriginalPrice) {
        return toFloatFixed(
          toFloatFixed(
            parseFloat(OriginalPrice * rate),
            2
          ) * (1 + this.serviceRate),
          2
        )
      }
    }
  }
</script>
