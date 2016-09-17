<template>
  <div>
    <div class="order_list_con">
      <div class="merch_main_img"><img :src="cover" alt=""></div>
      <div class="right_merch_text">
        <h3 class="shopping_tit">{{name}}</h3>
        <div class="font-weight_6">RMB {{price}}x{{quantity}}</div>
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
  </div>
  <div class="user_other_claim" v-if="hasNote">
    <div class="claim_con">
      {{note}}
    </div>
  </div>
</template>

<script>
  import noPic from '../../asset/images/noimg.png'

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
        required: true
      },
      coupon: {
        default: ''
      },
      note: {
        default: ''
      }
    },
    computed: {
      ifCoupon () {
        return this.is_buy ? '仍然下单' : '取消订单'
      },
      hasNote () {
        return this.note !== ''
      }
    }
  }
</script>
