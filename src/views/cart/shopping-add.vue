<template>
  <div>
    <div class="mar_bot_11" v-fix-bottom>
      <section class="merch_wrap">
        <div class="merch_con">
          <div class="real_card_shopping"><img :src="display.picture" alt=""></div>
          <div class="shopping_text_con">
            <h3 class="shopping_tit">{{display.skuSelect && display.skuSelect.Title}}</h3>
            <h4 class="merch_shop_tit">
              <img class="shop_logo"
                   :src="logos[shopLogo]"
                   alt="">
              <span class="dis_inline_block">{{display.skuSelect && select_currency.WebSiteName}}</span>
            </h4>
            <div class="price_to_shop"><span
              class="merch_price">{{display.skuSelect && select_currency.CurrencySign}}{{display.skuSelect && display.skuSelect.Price}}</span>
              <a class="to_shop_detail" :href="shopping.Url">官网商品详情</a></div>
          </div>
        </div>
      </section>
      <section v-if="ServiceCoefficient === 0" class="shopping_tips">
        <p class="font_28">{{OriginalCurrency}}&nbsp;:&nbsp;{{Currency}}=
          <span class="font-weight_6">1:{{select_currency && select_currency.Rate}}</span>
        </p>
        <p class="wid_100" v-if="display.rate && display.rate.RateDescription">
          ★{{select_currency.RateDescription}}</p>
      </section>
      <shopping-cost :price="afterRatePrice"
                     :currency_sign="currency.CurrencySign"
                     :freight="afterRateFreight">
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
            <input class="no_fill" type="text" v-model="coupon" placeholder="如有优惠码请填写"/></div>
        </div>
        <div class="web_promo_code pad_10">
          <div class="web_code">★当优惠码不可使用时,
          </div>
          <div class="code_input_box">
            <a class="do_order_disable"
               :class="{'do_order_used':!isBuy}"
               @click="selectIfBuy(false)">取消下单</a>
            <a class="do_order_disable"
               :class="{'do_order_used':isBuy}"
               @click="selectIfBuy(true)">仍然下单</a></div>
        </div>
        <p class="web_promo_code chajia">优惠码使用成功后，差价将在1个工作日内返还</p>
      </section>
      <section class="fill_other">
        <input class="fill_other_input" v-model="note" type="text" placeholder="如用其他要求，请在此填写"/></section>
      <section class="faq">
        <h3 class="tit1">
          常见问题FAQ
        </h3>
        <faq></faq>
      </section>
    </div>
    <footer class="shopping_footer" v-disable-tap>
      <div class="icon_shopping_cart_1" v-link="{name:'cart'}">
        <img :src="images.iconShoppingCard_1_2x" alt="">
        <span class="message_num">{{cart_count}}</span></div>
      <a class="into_cart_btn" @click="addToCart()">
        <img class="icon_into_shopping_cart" :src="images.IconShoppingCart_2"/>
        <span class="dis_inline_block">放入购物车</span> </a>
    </footer>
  </div>
</template>

<script>
  import { ShoppingCost, ShoppingSku } from '../../components'
  import Faq from '../layout/faq.vue'
  import { cart, app } from '../../store/action'
  import { getCurrency } from '../../services/util.svc'
  import images from '../../asset/images'
  import logos from '../../asset/web_logo'

  export default {
    props: ['shopping', 'cart_count', 'select_currency'],
    data(){
      return {
        images,
        logos,
        note: '',
        isBuy: true,
        coupon: ''
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
      ServiceCoefficient () {
        return (this.currency && this.currency.ServiceCoefficient) || 0
      },
      shopLogo () {
        const logo = this.select_currency.Logo
        if (!logo || logo === '') return ''
        let logoArr = logo.split('/')
        return logoArr[logoArr.length - 1]
      },
      afterRatePrice () {
        return this.select_currency
          && parseFloat(this.genRate(this.display.skuSelect.Price) * (1 + this.ServiceCoefficient)).toFixed(2)
      },
      afterRateFreight () {
        return this.display.skuSelect && (this.genRate(this.display.skuSelect.Freight) || this.genRate(this.shopping.Freight))
      },
      OriginalCurrency () {
        return getCurrency(this.select_currency.CurrencyCode)
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
        this.isBuy = isBuy
      },
      genCartInfo () {
        let skuMsg = ''
        this.shopping.SkuClasses && this.shopping.SkuClasses.forEach((option, index) => {
          skuMsg += `${option.TypeName}:${option.SkuProperties
            .find(item => item.PropId === this.display.skuSelect.PropIds[index]).PropertieName},`
        })
        return {
          Cover: this.display.picture,
          CountryId: this.select_currency.CountryId,
          ExpressFee: this.display.skuSelect.Freight || this.shopping.Freight,
          Height: this.shopping.Height || 0,
          Length: this.shopping.Length || 0,
          Name: this.display.skuSelect.Title,
          Note: this.note || '',
          OriginalCurrencyCode: this.select_currency.CurrencyCode,
          OriginalCurrencySign: this.select_currency.CurrencySign,
          OriginalPrice: this.display.skuSelect.Price,
          Pictures: this.display.picture,
          Quantity: this.display.count,
          Sku: skuMsg.toString().slice(0, -1),
          SkuId: this.display.skuSelect.SkuId,
          StoreLogo: this.display.skuSelect.Shop.Logo,
          StoreName: this.display.skuSelect.Shop.Name,
          StoreUrl: this.display.skuSelect.Shop.Url,
          UnitPrice: this.display.skuSelect.ListPrice,
          Url: this.display.skuSelect.Url,
          WebSiteId: this.select_currency.WebSiteId,
          CId: this.shopping.CId || '',
          OriginalUrl: this.shopping.OriginalUrl || '',
          RebateUrl: this.shopping.RebateUrl || '',
          Weight: this.shopping.Weight || 0,
          Width: this.shopping.Width || 0,
          IsBuy: this.isBuy,
          Coupon: this.coupon
        }
      },
      addToCart () {
        return cart.addToCart(this.$route.params.key, this.genCartInfo())
          .then(res => {
            if (res.Success) {
              this.showAlert('添加成功')
              this.$router.go({ name: 'cart' })
            }
          })
      }
    }
  }
</script>
