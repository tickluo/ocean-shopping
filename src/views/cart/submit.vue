<template>
  <div>
    <article class="about_address_wrap">
      <section class="change_address">
        <div class="user_address_name" v-if="!hasAddress" v-link="{name:'addAddress'}">
          <a href="#" class="wid_btn">
            <img :src="images.iconLocation" alt="" class="icon_location">
            <span class="dis_inline_block">填写收货地址(必填)</span></a>
        </div>
        <div class="user_address_name" v-if="hasAddress" v-link="{name:'selectAddress'}">
          <div class="font_size_30">
            <span class="font-weight_6">{{defaultAddress.RecipientName}}，{{defaultAddress.PhoneNumber}}</span>
          </div>
          <p> {{defaultAddress.StreetAddress1}}{{defaultAddress.StreetAddress2}}{{defaultAddress.StreetAddress3}} </p>
          <a href="#" class="to_change_address">更换收货地址 ></a>
        </div>
      </section>

      <section class="change_address pad_bot_30">
        <div class="user_address_name">
          <div class="font_size_30">订单金额：<span class="font-weight_6">RMB {{totalPrice}}</span></div>
          <p><span>★</span>不包含国际运费，国际运费将在您提交转运时支付 </p> <a class="to_shop_detail" href="#">国际运费说明</a></div>
      </section>
      <section class="change_address pad_bot_30">
        <div class="user_address_name">
          <div class="font_size_28">若订单出现意外情况，我们希望第一时间联系到您</div>
          <input class="fill_other_input" type="text" v-model="phone" placeholder="您的手机号(必填)">
        </div>
      </section>
      <a href="#" class="sel_other_company"> <span href="#" class="flex_width">
        <img class="icon_page" :src="images.iconPage" alt="">
        6City全球购服务免费声明，下单即为同意</span>
        <img :src="images.iconR" alt="" class="icon_right">
      </a>
    </article>

    <article class="about_address_wrap">
      <ul class="toggle_nav_list">
        <li>
          <a :class="{cur_item:!faq}" v-link="{name:'submitShopping'}">订单商品</a>
        </li>
        <li>
          <a :class="{cur_item:faq}" v-link="{name:'submitFaq'}">常见问题FAQ</a>
        </li>
      </ul>
      <router-view class="view" transition="slide-up" transition-mode="out-in" keep-alive>
      </router-view>

    </article>

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
    <c-alert :visible.sync="alertVisible"></c-alert>
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
  import { CAlert } from '../../components'
  import { matchCompanyShop } from '../../services/match.svc'
  import { orders, user } from '../../store/action'

  export default{
    data(){
      return {
        images,
        alertVisible: false,
        phone: ''
      }
    },
    components: {
      CAlert
    },
    vuex: {
      getters: {
        totalPrice: state => state.cart.shoppingTotalPrice.toFixed(2),
        companySet: state => state.cart.company.companySet,
        selectedShop: state => state.cart.order.selected,
        defaultAddress: state => state.user.defaultAddress
      },
      actions: {
        setDefaultAddress: user.getDefaultAddress
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
        if (!this.phone) {
          this.alertVisible = true
          return setTimeout(() => {
            this.alertVisible = false
          }, 1000)
        }
        let postOrder = {
          TotalAmount: this.totalPrice,
          PaymentType: 30,
          Phone: this.phone,
          key: '307480468f2bb43dd01b190a169c8084547b4403'
        }
        postOrder.SaveGrab = matchCompanyShop(this.companySet, this.selectedShop)
        orders.saveOrder(postOrder)
          .then(res => {
            debugger
            if (res.Success) {
              this.$router.go({ name: 'shopOrder' })
            }
          })
      }
    },
    route: {
      data ({ to: { params: { key } } }) {
        return this.setDefaultAddress(key)
          .then(res => {
          })
      },
      waitForData: true
    }
  }
</script>
