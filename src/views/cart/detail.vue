<template>
  <div>
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
        <p class="font_28">美元:人民币=<span class="font-weight_6">1:{{display.rate && display.rate.Rate}}</span></p>
        <p>★{{display.rate && display.rate.RateDescription}}</p>
      </section>
      <shopping-cost :price="afterRatePrice"
                     :currency_sign="display.rate && display.rate.CurrencySign"
                     :freight="afterRateFreight">
      </shopping-cost>
      <shopping-sku v-for="item in detail.SkuClasses" :title="item.TypeName" :id="$index"
                    :list="item.SkuProperties">
      </shopping-sku>
      <section class="promo_code_wrap">
        <div class="web_promo_code">
          <div class="web_code">网站优惠码:</div>
          <div class="code_input_box">
            <input class="no_fill" type="text" placeholder="如有优惠码请填写"/></div>
        </div>
        <div class="web_promo_code pad_10">
          <div class="web_code">★当优惠码不可使用时,
          </div>
          <div class="code_input_box"><a class="do_order_disable" href="#">取消下单</a> <a
            class="do_order_disable do_order_used" href="#">仍然下单</a></div>
        </div>
        <p class="web_promo_code chajia">优惠码使用成功后，差价将在1个工作日内返还</p>
      </section>
      <section class="fill_other">
        <input class="fill_other_input" v-model="note" type="text" placeholder="如用其他要求，请在此填写"/></section>
      <section class="faq">
        <h3 class="tit1">
          常见问题FAQ
        </h3>
        <div class="faq_con">
          <h4 class="tit2">
            1.我下单后我下单后我下单后我下单后我下单后
          </h4>
          <p class="faq_text"> A:
            大量的运用到了rem的单位值，深深的感觉到rem这个单位的强大，所以在这里推荐一篇淘宝的文章给大家了解下rem的一些基本用法。后续我还会出一篇关于rem更多的使用方法的文章分享给大家。 </p>
        </div>
        <h4 class="tit2">
          2.个标题而已标题标题标题
        </h4>
        <p class="faq_text"> A: 好啊好魔性哈好啊好魔性哈好啊好魔性哈好啊 </p>
      </section>
      <footer class="shopping_footer">
        <div class="icon_shopping_cart_1" v-link="{name:'cart'}"><img :src="images.iconShoppingCard_1_2x" alt=""> <span
          class="message_num">3</span></div>
        <a class="into_cart_btn"> <img class="icon_into_shopping_cart" :src="images.IconShoppingCart_2"/> <span
          class="dis_inline_block" @click="addToCart()">放入购物车</span> </a>
      </footer>
    </div>
  </div>
</template>

<script>
  import '../../asset/css/main.css'
  import { ShoppingCost, ShoppingSku } from '../../components'
  import { cart } from '../../store/action'
  import { getDisableSku } from '../../services/sku.svc'
  import { parseDomain } from '../../services/util.svc'
  import images from '../../asset/images'

  export default{
    data(){
      return {
        images,
        note: ''
      }
    },
    components: {
      ShoppingSku, ShoppingCost
    },
    vuex: {
      getters: {
        detail: state => state.cart.detail,
        display: state => state.cart.display
      },
      actions: {
        getShopping: cart.getShopping,
        initShoppingDisplay: cart.initShoppingDisplay,
        getExchangeRate: cart.getExchangeRate
      }
    },
    computed: {
      skuSelect () {
        return this.detail.Skus.find(item => item.Selected) ?
          this.detail.Skus.find(item => item.Selected) :
          this.detail.Skus[0]
      },
      afterRatePrice () {
        return this.display.rate && this.genRate(this.display.skuSelect.Price)
      },
      afterRateFreight () {
        return this.display.skuSelect && (this.genRate(this.display.skuSelect.Freight) || this.genRate(this.detail.Freight))
      }
    },
    methods: {
      genRate (price) {
        return parseFloat(this.display.rate.Rate * price).toFixed(2)
      },
      genCartInfo () {
        let skuMsg = ''
        this.detail.SkuClasses.forEach((option, index) => {
          skuMsg += `${option.TypeName}:${option.SkuProperties
            .find(item => item.PropId === this.display.skuSelect.PropIds[index]).PropertieName},`
        })
        return {
          Cover: this.display.picture,
          CountryId: this.display.rate.CountryId,
          ExpressFee: this.display.skuSelect.Freight || this.detail.Freight,
          Height: this.detail.Height || 0,
          Length: this.detail.Length || 0,
          Name: this.display.skuSelect.Title,
          Note: this.note || '',
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
          Weight: this.detail.Weight || 0,
          Width: this.detail.Width || 0,

        }
      },
      addToCart () {
        return cart.addToCart(this.$route.params.key, this.genCartInfo())
      }
    },
    route: {
      data({ to: { params: { key } } }) {
        return this.getShopping(key)
          .then(()=>this.getExchangeRate(key, parseDomain(this.detail.Shop.Url)))
          .then((data)=> {
            let disableSkuArray = getDisableSku(this.detail.SkuClasses, this.skuSelect, this.detail.Skus)
            return this.initShoppingDisplay({
              picture: this.detail.Picture,
              skuSelect: this.skuSelect,
              disableSku: disableSkuArray,
              rate: data.List[0],
              count: 1
            })
          })
      },
      waitForData: true
    }
  }
</script>
