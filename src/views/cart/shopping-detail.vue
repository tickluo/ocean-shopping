<template>
  <div>
    <shopping-fill v-if="type === 'fill'"
                   :shopping="shoppingView"
                   :cart_count="cartCount"
                   :is_country_rate="isCountryRate"
                   :fill_shopping="fillShopping"
                   :select_currency="selectCurrency">
    </shopping-fill>
    <shopping-add v-if="type === 'add'"
                  :shopping="shoppingView"
                  :cart_count="cartCount"
                  :select_currency="selectCurrency">
    </shopping-add>
    <shopping-modify v-if="type === 'modify'"
                     :shopping="shoppingView"
                     :select_currency="selectCurrency"
                     :modify_shopping="modifyShopping">
    </shopping-modify>
  </div>
</template>

<script>
  import { cart } from '../../store/action'
  import ShoppingFill from './shopping-fill.vue'
  import ShoppingAdd from './shopping-add.vue'
  import ShoppingModify from './shopping-modify.vue'
  import { getDisableSku } from '../../services/sku.svc'
  import { parseDomain } from '../../services/util.svc'

  export default{
    data() {
      return {
        type: '',
        cartCount: 0,
        isCountryRate: true,
        selectCurrency: {},
        shoppingView: {},
        modifyShopping: {},
        fillShopping: {}
      }
    },
    components: {
      ShoppingFill,
      ShoppingAdd,
      ShoppingModify
    },
    methods: {
      getExchangeRate: cart.getExchangeRate,
      getShopping: cart.getShopping
    },
    computed: {
      skuSelect () {
        if (!this.shoppingView.Skus) return this.shoppingView
        const findSelectedSku = this.shoppingView.Skus.find(item => item.Selected)
        return findSelectedSku ? findSelectedSku :
          this.shoppingView.Skus[0]
      }
    },
    vuex: {
      getters: {
        countries: state => state.cart.countries,
        cartList: state => state.cart.cartList
      },
      actions: {
        initShoppingDisplay: cart.initShoppingDisplay,
        setCountryRate: cart.setCountryRate
      }
    },
    route: {
      data({ to: { params: { key, Id, shopId } } })
      {
        let url = ''
        if (Id) {
          this.modifyShopping = this.cartList[shopId * 1].GrabAttrs
            .find(item => item.Id === parseInt(Id))
          url = this.modifyShopping.Url
        }
        return Promise.all([
          this.getShopping(key, url),
          cart.getCartCount(key),
          this.setCountryRate(key)
        ])
          .then((resArr) => {
            if (resArr[1].Success) {
              this.cartCount = resArr[1].Data
            }
            if (resArr[0].Success && resArr[0].Data.Price <= 0) {
              this.type = 'fill'
              this.shoppingView = resArr[0].Data
              if (Id) {
                const shoppingTemp = this.cartList[shopId * 1].GrabAttrs
                  .find(item => item.Id === parseInt(Id))
                this.fillShopping = {
                  isBuy: shoppingTemp.IsBuy,
                  defaultCount: shoppingTemp.Quantity,
                  shoppingPrice: shoppingTemp.OriginalPrice,
                  shoppingFreight: shoppingTemp.ExpressFee,
                  shoppingSku: shoppingTemp.Sku,
                  coupon: shoppingTemp.Coupon,
                  note: shoppingTemp.Note
                }
              } else {
                this.fillShopping = {
                  isBuy: true,
                  defaultCount: 1,
                  shoppingPrice: '',
                  shoppingFreight: '',
                  shoppingSku: '',
                  coupon: '',
                  note: ''
                }
              }
            }
            if (resArr[0].Success && resArr[0].Data.Price > 0 && !Id) {
              this.type = 'add'
              this.shoppingView = resArr[0].Data
              let disableSkuArray = this.shoppingView.SkuClasses
                ? getDisableSku(this.shoppingView.SkuClasses, this.skuSelect, this.shoppingView.Skus)
                : []
              this.initShoppingDisplay({
                picture: this.shoppingView.Picture,
                skuSelect: this.skuSelect,
                disableSku: disableSkuArray,
                count: 1
              })
            }
            if (resArr[0].Success && resArr[0].Data.Price > 0 && Id) {
              this.type = 'modify'
              this.shoppingView = resArr[0].Data
              let disableSkuArray = this.shoppingView.SkuClasses
                ? getDisableSku(this.shoppingView.SkuClasses, this.skuSelect, this.shoppingView.Skus)
                : []
              this.initShoppingDisplay({
                picture: this.shoppingView.Picture,
                skuSelect: this.skuSelect,
                disableSku: disableSkuArray,
                count: this.modifyShopping.Quantity
              })
            }
            // TODO: don't use parseDomain
            return this.getExchangeRate(key, parseDomain(resArr[0].Data.Shop.Url))
          })
          .then(res => {
            this.websiteRate = res.List[0]
            this.isCountryRate = !this.websiteRate || this.websiteRate.Rate <= 0
            if (!this.isCountryRate) this.selectCurrency = this.websiteRate
            else this.selectCurrency = this.countries[0]
          })
      },
      waitForData: true
    }
  }
</script>
