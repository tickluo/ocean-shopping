<template>
  <div class="bot_ccc">
    <div v-if="!$loadingRouteData">
      <section class="merch_wrap">
        <div class="merch_con">
          <div class="real_card_shopping"><img :src="display.picture" alt=""></div>
          <div class="shopping_text_con">
            <h3 class="shopping_tit">{{display.skuSelect && display.skuSelect.Title}}</h3>
            <h4 class="merch_shop_tit">
              <img class="shop_logo" :src="logos[shopLogo]" alt="">
              <span class="dis_inline_block">{{display.skuSelect && select_currency.WebSiteName}}</span>
            </h4>
            <div class="price_to_shop"><span
              class="merch_price">{{display.skuSelect && select_currency.CurrencySign}}{{display.skuSelect && display.skuSelect.Price}}</span>
              <a class="to_shop_detail" :href="shopping.Url">官网商品详情</a></div>
          </div>
        </div>
      </section>
      <section class="shopping_tips">
        <p class="font_28">{{OriginalCurrency}}&nbsp;:&nbsp;{{Currency}}=
          <span class="font-weight_6">1:{{select_currency && select_currency.Rate}}</span>
        </p>
        <p class="wid_100" v-if="select_currency && select_currency.RateDescription">
          ★{{select_currency.RateDescription}}</p>
      </section>
      <shopping-cost :price="afterRatePrice"
                     :currency_sign="currency.CurrencySign"
                     :freight="afterRateFreight"
                     :count="display.count">
      </shopping-cost>
      <shopping-sku v-for="item in shopping.SkuClasses"
                    :title="item.TypeName"
                    :id="$index"
                    :list="item.SkuProperties"
                    :sku="shopping.Skus"
                    :skuclasses="shopping.SkuClasses">
      </shopping-sku>
      <section class="promo_code_wrap">
        <div class="web_promo_code">
          <div class="web_code">网站优惠码:</div>
          <div class="code_input_box">
            <input class="no_fill" type="text" v-model="modify_shopping.Coupon" placeholder="如有优惠码请填写"/></div>
        </div>
        <div class="web_promo_code pad_10">
          <div class="web_code">★当优惠码不可使用时,
          </div>
          <div class="code_input_box">
            <a class="do_order_disable"
               :class="{'do_order_used':!modify_shopping.IsBuy}"
               @click="selectIfBuy(false)">取消下单</a>
            <a class="do_order_disable"
               :class="{'do_order_used':modify_shopping.IsBuy}"
               @click="selectIfBuy(true)">仍然下单</a></div>
        </div>
        <p class="web_promo_code chajia">优惠码使用成功后，差价将在1个工作日内返还</p>
      </section>
      <section class="fill_other">
        <input class="fill_other_input" v-model="modify_shopping.Note" type="text" placeholder="如用其他要求，请在此填写"/>
      </section>
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
  import { ShoppingCost, ShoppingSku } from '../../components'
  import Faq from '../layout/faq.vue'
  import { cart, app } from '../../store/action'
  import { getDisableSku } from '../../services/sku.svc'
  import { parseDomain, getCurrency } from '../../services/util.svc'
  import images from '../../asset/images'
  import logos from '../../asset/web_logo'

  export default{
    props: ['shopping', 'select_currency', 'modify_shopping'],
    data () {
      return {
        images,
        logos
      }
    },
    components: {
      ShoppingSku,
      ShoppingCost,
      Faq
    },
    vuex: {
      getters: {
        display: state => state.cart.display,
        currency: state => state.app.Currency
      },
      actions: {
        showAlert: app.showAlert
      }
    },
    computed: {
      shopLogo () {
        const logo = this.select_currency.Logo
        if (!logo || logo === '') return ''
        let logoArr = logo.split('/')
        return logoArr[logoArr.length - 1]
      },
      afterRatePrice () {
        return this.select_currency && this.genRate(this.display.skuSelect.Price)
      },
      afterRateFreight () {
        return this.display.skuSelect && (this.genRate(this.display.skuSelect.Freight) || this.genRate(this.shopping.Freight))
      },
      OriginalCurrency () {
        return getCurrency(this.modify_shopping.OriginalCurrencyCode)
      },
      Currency () {
        return getCurrency(this.currency.CurrencyCode)
      }
    },
    methods: {
      genRate (price) {
        return parseFloat(this.select_currency.Rate * price).toFixed(2)
      },
      selectIfBuy (isBuy) {
        this.modify_shopping.IsBuy = isBuy
      },
      genCartInfo () {
        let skuMsg = ''
        this.shopping.SkuClasses && this.shopping.SkuClasses.forEach((option, index) => {
          skuMsg += `${option.TypeName}:${option.SkuProperties
            .find(item => item.PropId === this.display.skuSelect.PropIds[index]).PropertieName},`
        })
        return {
          Id: this.modify_shopping.Id,
          Cover: this.display.picture,
          CountryId: this.select_currency.CountryId,
          ExpressFee: this.display.skuSelect.Freight || this.shopping.Freight,
          Height: this.shopping.Height || 0,
          Length: this.shopping.Length || 0,
          Name: this.display.skuSelect.Title,
          Note: this.modify_shopping.Note,
          OriginalCurrencyCode: this.select_currency.CurrencyCode,
          OriginalCurrencySign: this.select_currency.CurrencySign,
          OriginalPrice: this.display.skuSelect.Price,
          Pictures: this.display.picture,
          Quantity: this.display.count,
          Sku: skuMsg.toString().slice(0, -1),
          SkuId: this.display.skuSelect.SkuId,
          StoreLogo: this.display.skuSelect.Shop.Logo,
          StoreName: this.select_currency.WebSiteName,
          StoreUrl: this.display.skuSelect.Shop.Url,
          UnitPrice: this.display.skuSelect.ListPrice,
          Url: this.display.skuSelect.Url,
          WebSiteId: this.select_currency.WebSiteId,
          CId: this.shopping.CId || '',
          OriginalUrl: this.shopping.OriginalUrl || '',
          RebateUrl: this.shopping.RebateUrl || '',
          Weight: this.shopping.Weight || 0,
          Width: this.shopping.Width || 0,
          IsBuy: this.modify_shopping.IsBuy,
          Coupon: this.modify_shopping.Coupon
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
    }
  }
</script>
