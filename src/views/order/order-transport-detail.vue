<template>
  <div>
    <div class="mar_bot_9 mar_bot_15_5">
      <article class="order_wrap about_transport">
        <h4 class="order_number">
          <div class="real_number">
            转运: <span class="font-weight_6">{{tranOrderDetail.ShippingNo}}</span>
          </div>
        </h4>
        <h3 class="shopping_cart_tit height_08">
          <a href="#" class="shop_brand_name flex_width">物流跟踪：已到达中国，海关清关中</a>
          <img :src="images.iconR" alt="" class="icon_right">
        </h3>
        <section class="port_detail">
          <p><label>转运公司：</label>{{tranOrderDetail.ShippingCompanyName}}</p>
          <p><label>转运线路：</label>{{tranOrderDetail.ShippingWayName}}</p>
          <p><label>提交转运时间：</label>{{tranOrderDetail.SubmitTime}}</p>
          <p><label>物流单号：</label><strong>{{tranOrderDetail.b}}</strong></p>
          <p><label>转运重量：</label><strong>{{tranOrderDetail.Weight}}g</strong></p>
        </section>
        <section class="port_detail">
          <h4 class="tit2">{{tranOrderDetail.RecipientName}}，{{tranOrderDetail.PhoneNumber}}</h4>
          <p> {{tranOrderDetail.Province}}&nbsp;{{tranOrderDetail.City}}&nbsp;{{tranOrderDetail.Area}}</p>
          <p> {{tranOrderDetail.StreetAddress1}}
          </p>
          <p>
            身份证已上传({{tranOrderDetail.IdCard && tranOrderDetail.IdCard.substr(0,4)}}
            ************{{tranOrderDetail.IdCard && tranOrderDetail.IdCard.substr(-4,4)}})
          </p>
        </section>
        <section class="port_detail pad_20" v-if="tranOrderDetail.Note !== ''">
          <div class="user_other_claim">
            <div class="claim_con">
              {{tranOrderDetail.Note}}
            </div>
          </div>
        </section>
      </article>
      <article class="order_wrap">
        <display-shopping v-for="shopping in tranOrderDetail.GrabAttributes"
                          :cover="shopping.Cover"
                          :name="shopping.Name"
                          :price="shopping.Price"
                          :quantity="shopping.Quantity"
                          :sku="shopping.Sku"
                          :state="shopping.ProductStauts"
                          :state_name="shopping.ProductStautName"
                          :express="shopping.ExpressNumber">
        </display-shopping>
      </article>
    </div>

    <section class="pay_way_wrap" :class="{'fix_bot_16':tranOrderDetail.Replenishment}">
      <div class="pay_way_box bg_f8">
        <div class="alipay">
          国际运费
        </div>
        <div class="font-weight_6">
          RMB {{tranOrderDetail.TotalAmount}}
        </div>
      </div>
    </section>

    <div class="order_money_change" v-if="tranOrderDetail.Replenishment">
      {{tranOrderDetail.Replenishment.Reason}} + RMB {{tranOrderDetail.Replenishment.Money}}
    </div>

    <footer class="shopping_footer">
      <div class="icon_shopping_cart_1" @click="returnBack">
        <img class="icon_go_back_cart icon_back" :src="images.iconGoback" alt="">
        <span class="goback_cart">返回</span>
      </div>
      <div class="fot_order_static">
        已收货
      </div>
      <div class="into_cart_btn" @click="payOrder">
        <img class="icon_into_shopping_cart" :src="images.iconNext"/>
        <span class="dis_inline_block">去付款</span>
      </div>
    </footer>
  </div>
</template>

<script>
  import images from '../../asset/images'
  import displayShopping from '../layout/display-shopping.vue'
  import { orders, user, app } from '../../store/action'
  import { OrderType } from '../../local/state.enum'

  export default{
    data(){
      return {
        images
      }
    },
    components: {
      displayShopping
    },
    vuex: {
      getters: {
        tranOrderDetail: state => state.orders.tranOrderDetail
      },
      actions: {
        setTransportDetail: orders.setTransportDetail,
        setPayOrder: user.setPayOrder,
        genPay: app.genPay
      }
    },
    methods: {
      returnBack () {
        this.$router.go({ name: 'tranOrder' })
      },
      payOrder () {
        let tempType = OrderType.Order
        let tempPrice = this.tranOrderDetail.TotalAmount
        let tempId = this.tranOrderDetail.Id
        if (this.tranOrderDetail.Replenishment) {
          tempId = this.tranOrderDetail.Replenishment.Id
          tempType = OrderType.Replenishment
          tempPrice = this.tranOrderDetail.Replenishment.Money
        }
        this.setPayOrder({
          id: tempId,
          orderNo: this.tranOrderDetail.ShippingNo,
          type: tempType,
          totalAmount: tempPrice,
          returnUrl: `/#!/order/${this.$route.params.key}/transport`,
          backUrl: `/#!/transport/detail/${this.$route.params.id}/${this.$route.params.key}`
        })
        this.genPay(true)
      }
    },
    route: {
      data ({ to: { params: { id, key } } }) {
        if (this.tranOrderDetail.Id && this.tranOrderDetail.Id === id) {
          return this.tranOrderDetail
        }
        return orders.getTransportDetail(key, id)
          .then(res => {
            if (res.Success) {
              return this.setTransportDetail(res.Data)
            }
          })
      },
      waitForData: true
    }
  }
</script>
