<template>
  <div class="bot_ccc">
    <div v-if="!$loadingRouteData">
      <section class="merch_wrap">
        <div class="merch_con">
          <div class="real_card_shopping"><img :src="display.picture" alt=""></div>
          <div class="shopping_text_con">
            <h3 class="shopping_tit">{{display.skuSelect && display.skuSelect.Title}}</h3>
            <h4 class="merch_shop_tit">
              <img class="shop_logo" :src="display.skuSelect && display.skuSelect.Shop.Logo" alt="">
              <span class="dis_inline_block">{{display.skuSelect && display.rate.WebSiteName}}</span>
            </h4>
            <div class="price_to_shop"><span
              class="merch_price">{{display.skuSelect && display.rate.CurrencySign}}{{display.skuSelect && display.skuSelect.Price}}</span>
              <a class="to_shop_detail" :href="detail.Url">官网商品详情</a></div>
          </div>
        </div>
      </section>
      <section class="shopping_tips">
        <p class="font_28">{{OriginalCurrency}}&nbsp;:&nbsp;{{Currency}}=
          <span class="font-weight_6">1:{{display.rate && display.rate.Rate}}</span>
        </p>
        <p class="wid_100" v-if="display.rate && display.rate.RateDescription">★{{display.rate.RateDescription}}</p>
      </section>
      <shopping-cost :price="afterRatePrice"
                     :currency_sign="currency.CurrencySign"
                     :freight="afterRateFreight"
                     :count="display.count">
      </shopping-cost>
      <shopping-sku v-for="item in detail.SkuClasses" :title="item.TypeName" :id="$index"
                    :list="item.SkuProperties">
      </shopping-sku>
      <section class="promo_code_wrap">
        <div class="web_promo_code">
          <div class="web_code">网站优惠码:</div>
          <div class="code_input_box">
            <input class="no_fill" type="text" v-model="modifyShopping.Coupon" placeholder="如有优惠码请填写"/></div>
        </div>
        <div class="web_promo_code pad_10">
          <div class="web_code">★当优惠码不可使用时,
          </div>
          <div class="code_input_box">
            <a class="do_order_disable"
               :class="{'do_order_used':!modifyShopping.IsBuy}"
               @click="selectIfBuy(false)">取消下单</a>
            <a class="do_order_disable"
               :class="{'do_order_used':modifyShopping.IsBuy}"
               @click="selectIfBuy(true)">仍然下单</a></div>
        </div>
        <p class="web_promo_code chajia">优惠码使用成功后，差价将在1个工作日内返还</p>
      </section>
      <section class="fill_other">
        <input class="fill_other_input" v-model="modifyShopping.Note" type="text" placeholder="如用其他要求，请在此填写"/></section>
      <section class="faq">
        <h3 class="tit1">
          常见问题FAQ
        </h3>
        <faq></faq>
      </section>
      <footer class="shopping_footer">
        <div class="icon_shopping_cart_1" v-link="{name:'cart'}">
          <img class="icon_go_back_cart" :src="images.iconShoppingCard_1_1" alt="">
          <span class="goback_cart">返回购物车</span>
        </div>
        <div class="into_cart_btn">
          <img class="icon_into_shopping_cart" :src="images.iconShoppingCart_2"/>
          <span class="dis_inline_block" @click="addToCart()">保存修改</span>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
  import '../../asset/css/main.css'
  import { ShoppingCost, ShoppingSku } from '../../components'
  import Faq from '../layout/faq.vue'
  import { cart, app } from '../../store/action'
  import { getDisableSku } from '../../services/sku.svc'
  import { parseDomain, getCurrency } from '../../services/util.svc'
  import images from '../../asset/images'

  export default{
    data(){
      return {
        images,
        modifyShopping: {}
      }
    },
    components: {
      ShoppingSku,
      ShoppingCost,
      Faq
    },
    vuex: {
      getters: {
        detail: state => state.cart.detail,
        display: state => state.cart.display,
        cartList: state => state.cart.cartList,
        currency: state => state.app.Currency
      },
      actions: {
        getShopping: cart.getShopping,
        showAlert: app.showAlert,
        initShoppingDisplay: cart.initShoppingDisplay
      }
    },
    computed: {
      skuSelect () {
        if (!this.detail.Skus) return {}
        const findSelectedSku = this.detail.Skus.find(item => item.Selected)
        return findSelectedSku ? findSelectedSku :
          this.detail.Skus[0]
      },
      afterRatePrice () {
        return this.display.rate && this.genRate(this.display.skuSelect.Price)
      },
      afterRateFreight () {
        return this.display.skuSelect && (this.genRate(this.display.skuSelect.Freight) || this.genRate(this.detail.Freight))
      },
      OriginalCurrency () {
        return getCurrency(this.modifyShopping.OriginalCurrencyCode)
      },
      Currency () {
        return getCurrency(this.currency.CurrencyCode)
      }
    },
    methods: {
      genRate (price) {
        return parseFloat(this.display.rate.Rate * price).toFixed(2)
      },
      selectIfBuy (isBuy) {
        this.modifyShopping.IsBuy = isBuy
      },
      getExchangeRate: cart.getExchangeRate,
      genCartInfo () {
        let skuMsg = ''
        this.detail.SkuClasses.forEach((option, index) => {
          skuMsg += `${option.TypeName}:${option.SkuProperties
            .find(item => item.PropId === this.display.skuSelect.PropIds[index]).PropertieName},`
        })
        return {
          Id: this.modifyShopping.Id,
          Cover: this.display.picture,
          CountryId: this.display.rate.CountryId,
          ExpressFee: this.display.skuSelect.Freight || this.detail.Freight,
          Height: this.detail.Height || 0,
          Length: this.detail.Length || 0,
          Name: this.display.skuSelect.Title,
          Note: this.modifyShopping.Note,
          OriginalCurrencyCode: this.display.rate.CurrencyCode,
          OriginalCurrencySign: this.display.rate.CurrencySign,
          OriginalPrice: this.display.skuSelect.Price,
          Pictures: this.display.picture,
          Quantity: this.display.count,
          Sku: skuMsg.toString().slice(0, -1),
          SkuId: this.display.skuSelect.SkuId,
          StoreLogo: this.display.skuSelect.Shop.Logo,
          StoreName: this.display.rate.WebSiteName,
          StoreUrl: this.display.skuSelect.Shop.Url,
          UnitPrice: this.display.skuSelect.ListPrice,
          Url: this.display.skuSelect.Url,
          WebSiteId: this.display.rate.WebSiteId,
          CId: this.detail.CId || '',
          OriginalUrl: this.detail.OriginalUrl || '',
          RebateUrl: this.detail.RebateUrl || '',
          Weight: this.detail.Weight || 0,
          Width: this.detail.Width || 0,
          IsBuy: this.modifyShopping.IsBuy,
          Coupon: this.modifyShopping.Coupon
        }
      },
      addToCart () {
        return cart.addToCart(this.$route.params.key, this.genCartInfo())
          .then(res => {
            if (res.Success) {
              this.showAlert('修改成功')
              this.$router.go({ name: 'cart' })
            }
          })
      }
    },
    route: {
      data({ to: { params: { key, Id, shopId } } }) {
        return this.getShopping(key)
          .then(()=>this.getExchangeRate(key, parseDomain(this.detail.Shop.Url)))
          .then((data)=> {
            let disableSkuArray = getDisableSku(this.detail.SkuClasses, this.skuSelect, this.detail.Skus)
            let displayInfo = {}
            if (Id) {
              this.modifyShopping = this.cartList[shopId * 1].GrabAttrs.find(item => item.Id === parseInt(Id))
              displayInfo.picture = this.modifyShopping.Cover
              displayInfo.skuSelect = this.detail.Skus.find(item => item.SkuId === this.modifyShopping.SkuId)
              displayInfo.disableSku = disableSkuArray
              displayInfo.rate = data.List[0]
              displayInfo.count = this.modifyShopping.Quantity
            }
            else {
              displayInfo = {
                picture: this.detail.Picture,
                skuSelect: this.skuSelect,
                disableSku: disableSkuArray,
                rate: data.List[0],
                count: 1
              }
            }
            return this.initShoppingDisplay(displayInfo)
          })
      },
      waitForData: true
    }
  }
</script>
