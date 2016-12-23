<template>
  <div>
    <v-loading v-if="$loadingRouteData"></v-loading>
    <div v-if="!$loadingRouteData" class="mar_bot_08" :class="{'mar_bot_14': orderDetail.Replenishment}" v-fix-bottom>
      <article class="order_wrap">
        <h4 class="order_number">
          <div class="real_number">
            订单:<span class="font-weight_6">{{orderDetail.OrderNo}}</span>
          </div>
        </h4>
        <section class="kd_company">
          <div>转运公司: <strong>{{orderDetail.ShippingCompanyName}}</strong></div>
          <div>下单时间: {{orderDetail.CreateTime}}</div>
        </section>

        <section class="order_list">
          <display-shopping v-for="shopping in orderDetail.GrabAttrs"
                            :cover="shopping.Cover"
                            :name="shopping.Name"
                            :price="shopping.Price"
                            :quantity="shopping.Quantity"
                            :sku="shopping.Sku"
                            :coupon="shopping.Coupon"
                            :is_buy="shopping.IsBuy"
                            :note="shopping.Note"
                            :state="shopping.ProductStauts"
                            :state_name="shopping.ProductStautName"
                            :express="shopping.ExpressNumber">
          </display-shopping>
        </section>
      </article>

    </div>
    <section class="summary_money" :class="{'fix_bot_16': orderDetail.Replenishment}" v-disable-tap>
      <div class="summary_con">
        <span class="summary_left">订单总额</span>
        <strong class="text_align_r">RMB {{orderDetail.TotalAmount}}</strong>
      </div>
    </section>

    <div class="order_money_change" v-if="orderDetail.Replenishment" v-disable-tap>
      {{orderDetail.Replenishment.Reason||''}} + RMB {{orderDetail.Replenishment.Money}}
    </div>
    <footer class="shopping_footer" v-disable-tap>
      <div class="icon_shopping_cart_1" v-link="{name:'shoporder'}">
        <img class="icon_go_back_cart icon_back" :src="images.iconGoback" alt="">
        <span class="goback_cart">返回</span>
      </div>
      <div class="into_cart_btn"
           @click="payOrder"
           v-if="orderDetail.OrderStatus === OrderStatus.OrderPending || orderDetail.Replenishment">
        <img class="icon_into_shopping_cart" :src="images.iconOk">
        <span class="dis_inline_block">去付款</span>
      </div>
    </footer>
  </div>
</template>

<script>
  import images from '../../asset/images'
  import displayShopping from '../layout/display-shopping.vue'
  import VLoading from '../../components/v-loading.vue'
  import { orders, user, app } from '../../store/action'
  import { OrderStatus, OrderType } from '../../local/state.enum'

  export default{
    data(){
      return {
        images,
        OrderStatus
      }
    },
    vuex: {
      getters: {
        orderDetail: state => state.orders.orderDetail
      },
      actions: {
        getOrderDetail: orders.getOrderDetail,
        setPayOrder: user.setPayOrder,
        genPay: app.genPay
      }
    },
    components: {
      displayShopping,
      VLoading
    },
    methods: {
      payOrder () {
        let tempType = OrderType.Order
        let tempPrice = this.orderDetail.TotalAmount
        let tempId = this.orderDetail.Id
        if (this.orderDetail.Replenishment) {
          tempType = OrderType.Replenishment
          tempPrice = this.orderDetail.Replenishment.Money
          tempId = this.orderDetail.Replenishment.Id
        }
        this.setPayOrder({
          id: tempId,
          orderNo: this.orderDetail.OrderNo,
          type: tempType,
          totalAmount: tempPrice,
          returnUrl: '/#!/order/',
          backUrl: `/#!/order/detail/${this.$route.params.id}`
        })
        this.genPay(true)
      }
    },
    route: {
      data ({ to: { params: { id } } }) {
        if (this.orderDetail.Id && this.orderDetail.Id === id * 1) {
          return {}
        }
        return this.getOrderDetail(id)
          .then(res => {
          })
      }
    }
  }
</script>
