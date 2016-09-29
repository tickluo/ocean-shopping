<template>
  <section class="order_list">
    <div class="order_list_con">
      <div class="merch_main_img"><img :src="cover" alt=""></div>
      <div class="right_merch_text">
        <h3 class="shopping_tit">{{name}}</h3>
        <div class="font-weight_6">RMB {{price}}&nbsp;x&nbsp;{{quantity}}</div>
        <p class="brand_attr"> {{sku}} </p>
      </div>
    </div>
    <div class="coupon_wrap" v-if="coupon">
      <div class="coupon_left"></div>
      <div class="coupon_right">
        <strong>{{coupon}}</strong>
        <span class="font_size_25">（不可用时{{ifCoupon}}）</span>
      </div>
    </div>
    <div class="user_other_claim" v-if="hasNote">
      <div class="claim_con">
        {{note}}
      </div>
    </div>
    <div class="order_static_wrap" v-if="state > 0">
      <div class="order_static">
        <span class="icon_rect"></span>
        <span class="font_size_25">{{state_name}}</span>
      </div>
      <a href="#" class="to_scan_shipment font_size_25" v-if="express">
        查看物流
      </a>
    </div>
  </section>
</template>

<script>
  import noPic from '../../asset/images/noimg.png'
  import { OrderStatus } from '../../local/state.enum'

  export default{
    /* props: ['cover', 'name', 'price', 'quantity', 'sku'],*/
    props: {
      cover: {
        default: noPic
      },
      name: {
        required: true
      },
      price: {
        required: true
      },
      quantity: {
        required: true
      },
      sku: {
        required: true
      },
      is_buy: {
        default: true
      },
      coupon: {
        default: ''
      },
      note: {
        default: ''
      },
      state: {
        default: ''
      },
      state_name: {
        default: ''
      },
      express: {
        default: ''
      }
    },
    data () {
      return {
        OrderStatus
      }
    },
    computed: {
      ifCoupon () {
        return this.is_buy ? '仍然下单' : '取消订单'
      },
      hasNote () {
        return this.note !== ''
      },
      hasState () {
        return this.state !== ''
      }
    }
  }
</script>
