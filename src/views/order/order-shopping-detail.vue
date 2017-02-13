<template>
  <div>
    <v-loading v-if="$loadingRouteData"></v-loading>
    <div v-if="!$loadingRouteData" class="mar_bot_08" :class="{'mar_bot_19': orderDetail.Replenishment}" v-fix-bottom>
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
    <div v-if="orderDetail.OrderStatus === OrderStatus.OrderPending || orderDetail.Replenishment">
      <section v-if="!outOfTime(orderDetail.UpdateTime)" class="tip_apy">
        价格，库存随官网实时变动，请在15分钟内付款。
      </section>
      <section v-if="outOfTime(orderDetail.UpdateTime)" class="tip_apy">
        订单超过15分钟未付款，您可以重新加入购物车。
      </section>
    </div>

    <section class="summary_money" :class="{'fix_bot_16': orderDetail.Replenishment}" v-disable-tap>
      <!--order-shoping-tips-->

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
      <div v-if="orderDetail.OrderStatus === OrderStatus.OrderPending || orderDetail.Replenishment">
        <div v-if="!outOfTime(orderDetail.UpdateTime)">
          <div class="del_order_shopping">
            <span class="dis_inline_block" @click="removeOrder(orderDetail.Id)">取消订单</span>
          </div>
          <div class="into_cart_btn"
               @click="payOrder">
            <img class="icon_into_shopping_cart" :src="images.iconOk">
            <span class="dis_inline_block">去付款</span>
          </div>
        </div>
        <div v-if="outOfTime(orderDetail.UpdateTime)">
          <div class="del_order_shopping">
            <span class="dis_inline_block" @click="delOrder(orderDetail.Id)">删除订单</span>
          </div>
          <div class="into_cart_btn"
               @click="reBuy(orderDetail.GrabAttrs)">
            <img class="icon_into_shopping_cart" :src="images.iconOk">
            <span class="dis_inline_block">重新购买</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  import images from '../../asset/images'
  import displayShopping from '../layout/display-shopping.vue'
  import VLoading from '../../components/v-loading.vue'
  import { timeStamp } from '../../local/config.enum'
  import { cart, orders, user, app } from '../../store/action'
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
        genPay: app.genPay,
        showConfirm: app.showConfirm,
        showAlert: app.showAlert,
        cancelOrder: orders.cancelOrder,
        deleteOrder: orders.deleteOrder,
        setSubmitLoading: app.setSubmitLoading
      }
    },
    components: {
      displayShopping,
      VLoading
    },
    methods: {
      outOfTime (date) {
        const now = new Date().getTime()
        return (now - Date.parse(new Date(date))) > timeStamp.order
      },
      removeOrder(id) {
        this.showConfirm({
          tip: '是否取消订单？',
          button: '取消订单',
          success: '订单已取消',
          fail: '取消订单失败',
          handle: () => {
            this.setSubmitLoading(true, '正在取消订单...')
            return this.cancelOrder(id)
              .then(res => {
                this.setSubmitLoading(false)
                return Promise.resolve(res)
              })
          }
        })
      },
      delOrder(id) {
        this.showConfirm({
          tip: '是否删除订单？',
          button: '删除订单',
          success: '订单已删除',
          fail: '删除订单失败',
          handle: () => {
            this.setSubmitLoading(true, '正在删除订单...')
            return this.deleteOrder(id)
              .then(res => {
                this.setSubmitLoading(false)
                this.$router.go({ name: 'shoporder' })
                return Promise.resolve(res)
              })
          }
        })
      },
      reBuy (list) {
        let flag = false //sign if any shopping didn't add successfully
        this.setSubmitLoading(true, '重新添加商品...')
        Promise.all(list.map(item => {
          return cart.getShopping(item.Url)
        }))
          .then(resArr => {
            let shoppingListTemp = []
            resArr.forEach((res, index) => {
              if (res.Success) {
                let quantity = res.Data.Quantity
                if (list[index].SkuId !== "" && res.Data.Skus && res.Data.Skus.length > 0) {
                  let skuShopping = res.Data.Skus.find(shopping => shopping.SkuId === list[index].SkuId)
                  if (skuShopping) quantity = skuShopping.Quantity
                  else flag = true
                }
                if (quantity <= 0) return flag = true;
                let reAddShopping = Object.assign({}, list[index])
                reAddShopping.Quantity = quantity > reAddShopping.Quantity ? reAddShopping.Quantity : quantity
                reAddShopping.Id = 0
                shoppingListTemp.push(reAddShopping)
              }
            })
            if (shoppingListTemp.length === 0) return this.showAlert('全部商品都已无库存')
            return Promise.all(shoppingListTemp.map(item => {
              return cart.addToCart(item)
            }))
          })
          .then(() => {
            this.setSubmitLoading(false)
            if (flag) return this.showAlert('部分商品已无库存')
            this.$router.go({ name: 'cart' })
          })
      },
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
