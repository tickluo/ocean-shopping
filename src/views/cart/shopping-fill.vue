<template xmlns:v-validate="http://www.w3.org/1999/xhtml">
  <div>
    <div v-fix-bottom="ss"></div>
    <section class="merch_wrap">
      <div class="merch_con">
        <div class="real_card_shopping">
          <img :src="images.noimg" alt="">
        </div>
        <div class="shopping_text_con">
          <h3 class="shopping_tit">{{shopping.Title}}</h3>
          <h4 class="merch_shop_tit">
            <span class="dis_inline_block">{{shopping.Shop && shopping.Shop.Name}}</span>
          </h4>
          <div class="price_to_shop"><a :href="shopping.Url" class="to_shop_detail to_left">官网商品详情</a></div>
        </div>
      </div>
    </section>
    <section v-if="ServiceCoefficient === 0" class="shopping_tips">
      <p class="font_28">{{getCurrency(select_currency.CurrencyCode)}}
        &nbsp;:&nbsp;{{getCurrency(currentCurrency.CurrencyCode)}}=
        <span class="font-weight_6">1:{{select_currency.Rate}}</span>
      </p>
    </section>
    <validator name="shoppingValidation">
      <section class="merch_attr_wrap">
        <div class="mrch_attr_tit">商品单价:</div>
        <div class="merch_attr_detail">RMB {{fill_shopping.shoppingPrice ? computeRate(fill_shopping.shoppingPrice)
          :'0.00'}}
        </div>
        <div class="fill_price">
          <div class="like_select">
            <span>{{getCurrency(select_currency.CurrencyCode)}}</span>
            <img :src="images.circleDown_2" v-if="is_country_rate" alt="" class="circle_down">
          </div>
          <select class="select_label"
                  :disabled="is_country_rate ? false : 'disable'"
                  v-model="select_currency">
            <option v-for="currency in countries"
                    selected="{{currency === select_currency}}"
                    :value="currency">{{getCurrency(currency.CurrencyCode)}}
            </option>
          </select>

          <input class="no_fill"
                 type="text"
                 :class="{'err_input':
                     $shoppingValidation.price &&
                     $shoppingValidation.price.modified &&
                     $shoppingValidation.price.invalid}"
                 v-validate:price="{
                     required: { rule: true, message: '请填写商品价格' },
                     numeric: { rule: true, message: '请填写数字' }
                     }"
                 v-model="fill_shopping.shoppingPrice"
                 placeholder="请填写{{getCurrency(select_currency.CurrencyCode)}}价格">
        </div>
      </section>
      <section class="merch_attr_wrap">
        <div class="mrch_attr_tit">商家运费:</div>
        <div class="merch_attr_detail">RMB {{fill_shopping.shoppingFreight ?
          computeRate(fill_shopping.shoppingFreight) : '0.00'}}
        </div>
        <div class="post_fee">
          <input type="text"
                 class="no_fill"
                 :class="{'err_input':
                     $shoppingValidation.freight &&
                     $shoppingValidation.freight.modified &&
                     $shoppingValidation.freight.invalid}"
                 v-validate:freight="{
                     numeric: { rule: true, message: '请填写数字' }
                     }"
                 v-model="fill_shopping.shoppingFreight"
                 placeholder="如有运费请填写{{getCurrency(select_currency.CurrencyCode)}}">
        </div>
      </section>
    </validator>
    <section class="merch_attr_wrap opear_num">
      <div class="mrch_attr_tit">商品数量:</div>
      <div class="merch_attr_detail">
        <span class="button_reduce" @click="reduceCount"></span>
        <span class="real_num"><input readonly="readonly" type="text" :value="fill_shopping.defaultCount"/></span>
        <span class="button_add" @click="addCount"></span>
      </div>
    </section>
    <section class="fill_other">
      <input class="fill_other_input bor_color_6"
             type="text"
             v-model="fill_shopping.shoppingSku"
             placeholder="此处可填写商品规格，如颜色/尺寸等"></section>
    <section class="promo_code_wrap">
      <div class="web_promo_code">
        <div class="web_code">网站优惠码:</div>
        <div class="code_input_box">
          <input class="no_fill" type="text" v-model="fill_shopping.coupon" placeholder="如有优惠码请填写"/>
        </div>
      </div>
      <div class="web_promo_code pad_10">
        <div class="web_code">★当优惠码不可使用时,
        </div>
        <div class="code_input_box">
          <a class="do_order_disable"
             :class="{'do_order_used':!fill_shopping.isBuy}"
             @click="selectIfBuy(false)">取消下单</a>
          <a class="do_order_disable"
             :class="{'do_order_used':fill_shopping.isBuy}"
             @click="selectIfBuy(true)">仍然下单</a></div>
      </div>
      <p class="web_promo_code chajia">优惠码使用成功后，差价将在1个工作日内返还</p>
    </section>
    <section class="fill_other">
      <input class="fill_other_input" v-model="fill_shopping.note" type="text" placeholder="如用其他要求，请在此填写"/></section>
    <section class="faq">
      <h3 class="tit1">
        常见问题FAQ
      </h3>
      <faq></faq>
    </section>
    <footer class="shopping_footer" v-if="!$route.params.Id" v-disable-tap>
      <div class="icon_shopping_cart_1" v-link="{name:'cart'}">
        <img :src="images.iconShoppingCard_1_2x" alt="">
        <span class="message_num">{{cart_count}}</span></div>
      <a class="into_cart_btn" @click="addToCart()">
        <img class="icon_into_shopping_cart" :src="images.IconShoppingCart_2"/>
        <span class="dis_inline_block">放入购物车</span> </a>
    </footer>

    <footer class="shopping_footer" v-if="$route.params.Id" v-disable-tap>
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
</template>

<script>
  import images from '../../asset/images'
  import Faq from '../layout/faq.vue'
  import { cart, app } from '../../store/action'
  import { getCurrency } from '../../services/util.svc'

  export default{
    props: [
      'shopping',
      'cart_count',
      'is_country_rate',
      'select_currency',
      'fill_shopping'
    ],
    data () {
      return {
        images
      }
    },
    components: {
      Faq
    },
    vuex: {
      getters: {
        countries: state => state.cart.countries,
        currentCurrency: state => state.app.Currency
      },
      actions: {
        showAlert: app.showAlert,
        setSubmitLoading: app.setSubmitLoading
      }
    },
    computed: {
      ServiceCoefficient () {
        return (this.currency && this.currency.ServiceCoefficient) || 0
      },
      shoppingRate () {
        return this.select_currency.Rate
      }
    },
    methods: {
      getCurrency,
      computeRate (price) {
        return parseFloat((price * this.shoppingRate).toFixed(2) * (1 + this.ServiceCoefficient)).toFixed(2)
      },
      selectIfBuy (isBuy) {
        this.fill_shopping.isBuy = isBuy
      },
      addCount () {
        this.fill_shopping.defaultCount++
      },
      reduceCount () {
        this.fill_shopping.defaultCount === 1 || ( this.fill_shopping.defaultCount--)
      },
      genCartInfo () {
        return {
          Id: this.$route.params.Id,
          CountryId: this.is_country_rate ? this.select_currency.Id : this.select_currency.CountryId,
          ExpressFee: this.fill_shopping.shoppingFreight * 1,
          Height: this.shopping.Height || 0,
          Length: this.shopping.Length || 0,
          Name: this.shopping.Title,
          Note: this.fill_shopping.note || '',
          OriginalCurrencyCode: this.select_currency.CurrencyCode,
          OriginalCurrencySign: this.select_currency.CurrencySign,
          OriginalPrice: this.fill_shopping.shoppingPrice * 1,
          Quantity: this.fill_shopping.defaultCount,
          Sku: this.fill_shopping.shoppingSku || '',
          StoreName: this.shopping.Shop.Name,
          StoreUrl: this.shopping.Shop.Url,
          UnitPrice: this.shopping.ListPrice,
          Url: this.shopping.Url,
          CId: this.shopping.CId || '',
          OriginalUrl: this.shopping.OriginalUrl || '',
          RebateUrl: this.shopping.RebateUrl || '',
          Weight: this.shopping.Weight || 0,
          Width: this.shopping.Width || 0,
          IsBuy: this.fill_shopping.isBuy,
          Coupon: this.fill_shopping.coupon
        }
      },
      addToCart () {
        if (this.$shoppingValidation.invalid) {
          this.$shoppingValidation.errors.forEach(item => {
            this.$shoppingValidation[item.field].modified = true
          })
          return this.showAlert(this.$shoppingValidation.errors[0].message)
        }
        const duringMsg = this.$route.params.Id ? '正在修改...' : '正在添加至购物车...'
        const resMsg = this.$route.params.Id ? '修改' : '添加'
        this.setSubmitLoading(true, duringMsg)
        return cart.addToCart(this.$route.params.key, this.genCartInfo())
          .then(res => {
            if (res.Success) {
              this.showAlert(`${resMsg}成功`)
              this.$router.go({ name: 'cart' })
            }
            else {
              this.showAlert(`${resMsg}失败`)
            }
          })
      }
    }
  }
</script>
