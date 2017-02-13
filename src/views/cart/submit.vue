<template xmlns:v-validate="http://www.w3.org/1999/xhtml">
  <div>
    <v-loading v-if="$loadingRouteData"></v-loading>
    <div v-if="!$loadingRouteData" v-fix-bottom="ss">
      <div class="mar_bot_10">
        <article class="about_address_wrap">
          <section class="change_address">
            <div class="user_address_name" v-if="!hasAddress" v-link="{name:'addAddress'}">
              <a class="wid_btn">
                <img :src="images.iconLocation" alt="" class="icon_location">
                <span class="dis_inline_block">填写收货地址(必填)</span></a>
            </div>
            <div class="user_address_name" v-if="hasAddress">
              <div class="font_size_30">
                <span class="font-weight_6">{{defaultAddress.RecipientName}}，{{defaultAddress.PhoneNumber}}</span>
              </div>
              <p>
                {{defaultAddress.StreetAddress1}}{{defaultAddress.StreetAddress2}}{{defaultAddress.StreetAddress3}} </p>
              <a v-link="{name:'selectAddress'}" class="to_change_address">更换收货地址 ></a>
            </div>
          </section>

          <section class="change_address pad_bot_30">
            <div class="user_address_name">
              <div class="font_size_30">订单金额：<span class="font-weight_6">RMB {{totalPrice}}</span></div>
              <p><span>★</span>不包含国际运费，国际运费将在您提交转运时支付 </p>
              <a v-link="{name:'freight'}" class="to_shop_detail">国际运费说明</a>
            </div>
          </section>
          <section class="change_address pad_bot_30">
            <div class="user_address_name">
              <div class="font_size_28">若订单出现意外情况，我们希望第一时间联系到您</div>
              <validator name="phoneValidation">
                <input id="phone" class="fill_other_input"
                       :class="{'no_phone':
                     $phoneValidation.phone &&
                     $phoneValidation.phone.modified &&
                     $phoneValidation.phone.invalid}"
                       v-validate:phone="{
                     required: { rule: true, message: '请输入手机号' },
                     telephone:{ rule: true, message: '请输入正确的手机号' }
                     }"
                       type="tel"
                       v-model="phone"
                       placeholder="您的手机号(必填)">
              </validator>
            </div>
          </section>
          <a class="sel_other_company" v-link="{name:'disclaimer'}">
          <span class="flex_width">
        <img class="icon_page" :src="images.iconPage" alt="">
        6City全球购服务免责声明，下单即为同意
          </span>
            <img :src="images.iconR" alt="" class="icon_right">
          </a>
        </article>

        <article class="about_address_wrap">
          <ul class="toggle_nav_list">
            <li>
              <a :class="{cur_item:!faq}" v-link="{name:'submitShopping'}">订单商品
                <span class="bot_hr"></span>
              </a>
            </li>
            <li>
              <a :class="{cur_item:faq}" v-link="{name:'submitFaq'}">常见问题FAQ
                <span class="bot_hr"></span>
              </a>
            </li>
          </ul>
          <router-view class="view" transition="slide-up" transition-mode="out-in" keep-alive>
          </router-view>
        </article>
      </div>
    </div>
    <section class="pay_way_wrap">
      <div class="pay_way_box">
        <img class="icon_alipay_wecheat" :src="images.iconAlipay" alt="">
        <div class="alipay">
          支付宝
        </div>
        <div class="font-weight_6">
          RMB {{totalPrice}}
        </div>
      </div>
    </section>
    <footer class="shopping_footer">
      <div class="icon_shopping_cart_1" @click.prevent="returnBack">
        <img class="icon_go_back_cart icon_back" :src="images.iconGoback" alt="">
        <span class="goback_cart">上一步</span></div>
      <div class="into_cart_btn" @click="saveOrder">
        <img class="icon_into_shopping_cart" :src="images.iconOk"/>
        <span class="dis_inline_block">支付订单</span>
      </div>
    </footer>
  </div>
</template>

<script>
  import images from '../../asset/images'
  import { CAlert, VLoading } from '../../components'
  import { toFloatFixed } from '../../services/util.svc'
  import { matchCompanyShop } from '../../services/match.svc'
  import { orders, user, app } from '../../store/action'

  export default{
    data(){
      return {
        images,
        phone: ''
      }
    },
    components: {
      CAlert,
      VLoading
    },
    vuex: {
      getters: {
        totalPrice: state => toFloatFixed(state.cart.shoppingTotalPrice, 2),
        companySet: state => state.cart.company.companySet,
        selectedShop: state => state.cart.order.selected,
        defaultAddress: state => state.user.defaultAddress
      },
      actions: {
        setDefaultAddress: user.getDefaultAddress,
        setPayOrder: user.setPayOrder,
        genPay: app.genPay,
        showAlert: app.showAlert,
        showConfirm: app.showConfirm,
        setSubmitLoading: app.setSubmitLoading
      }
    },
    computed: {
      faq () {
        return this.$route.name === 'submitFaq'
      },
      hasAddress () {
        return this.defaultAddress && this.defaultAddress.Id > 0
      }
    },
    methods: {
      returnBack () {
        this.$router.go({ name: 'company' })
      },
      saveOrder () {
        if (this.$phoneValidation.phone.invalid) {
          this.$phoneValidation.phone.modified = true
          return this.showAlert(this.$phoneValidation.phone.errors[0].message)
        }
        let postOrder = {
          TotalAmount: this.totalPrice,
          PaymentType: 30,
          Phone: this.phone
        }
        postOrder.SaveGrab = matchCompanyShop(this.companySet, this.selectedShop)
        this.showConfirm({
          tip: '是否支付订单？',
          button: '支付',
          success: '订单已生成',
          fail: '订单生成失败',
          handle: () => {
            this.setSubmitLoading(true, '正在生成订单...')
            return orders.saveOrder(postOrder)
              .then(res => {
                this.setSubmitLoading(false)
                if (res.Success) {
                  this.setPayOrder({
                    paymentNo: res.Data.PaymentNo,
                    totalAmount: res.Data.TotalAmount,
                    returnUrl: '/#!/order/',
                    backUrl: '/#!/order/'
                  })
                  this.genPay(true)
                }
                return Promise.resolve(res)
              })
          }
        })
      }
    },
    route: {
      data () {
        if (!this.selectedShop || this.selectedShop.length === 0)
          return this.$router.go({ name: 'cart' })
        if (this.defaultAddress.Id) return {}
        return this.setDefaultAddress()
          .then(res => {
          })
      }
    }
  }
</script>
