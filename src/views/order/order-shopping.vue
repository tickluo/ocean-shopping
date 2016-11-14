<template>
  <div  v-fix-bottom="ss">
      <load-more class="margin_top_08 mar_bot_11" :top-method="loadTop"
                 :bottom-method="loadBottom"
                 :bottom-all-loaded="allLoaded"
                 :auto-fill="false">
        <article class="order_wrap" v-for="order in orderList"
                 v-link="{name:'shopOrderDetail',params:{id:order.Id}}">
          <h4 class="order_number">
            <div class="real_number">
              订单:<span class="font-weight_6">{{order.OrderNo}}</span>
            </div>
          </h4>
          <display-shopping v-for="shopping in order.GrabAttrs"
                            :cover="shopping.Cover"
                            :name="shopping.Name"
                            :price="shopping.Price"
                            :quantity="shopping.Quantity"
                            :sku="shopping.Sku"
                            :state="shopping.ProductStauts"
                            :state_name="getStateText(shopping.ProductStautName,order.OrderCancelReasonName)"
                            :express="shopping.ExpressNumber"
                            :express_name="shopping.ExpressCompanyName">
          </display-shopping>
          <div class="pay_money_wrap"
               v-if="order.OrderStatus === OrderStatus.OrderPending || order.Replenishment">
            <div class="font_28" v-if="order.Replenishment">{{order.Replenishment.Reason}}
              <span class="font-weight_6">+RMB {{order.Replenishment.Money}}</span>
            </div>
            <a class="font_size_30 cancel_order_btn" @click.stop="removeOrder(order.Id)">取消订单</a>
            <a class="font_size_30" @click.stop="payOrder(order.Id)">去付款</a>
          </div>
        </article>
      </load-more>
    <div id="orderShopping"></div>
  </div>
</template>

<script>
  import images from '../../asset/images'
  import LoadMore from '../../components/c-loadmore.vue'
  import displayShopping from '../layout/display-shopping.vue'
  import { orders, user, app } from '../../store/action'
  import { OrderStatus, OrderType } from '../../local/state.enum'

  export default{
    data () {
      return {
        images,
        OrderStatus,
        pageIndex: 1,
        allLoaded: false
      }
    },
    components: {
      displayShopping,
      LoadMore
    },
    vuex: {
      getters: {
        orderList: state => state.orders.orderList
      },
      actions: {
        getOrderList: orders.getOrderList,
        setPayOrder: user.setPayOrder,
        genPay: app.genPay,
        showConfirm: app.showConfirm,
        showAlert: app.showAlert,
        cancelOrder: orders.cancelOrder,
        setSubmitLoading: app.setSubmitLoading
      }
    },
    methods: {
      getStateText (state, text) {
        if (text) {
          return `${state}：${text}`
        }
        return `${state}`
      },
      loadBottom (id) {
        this.getOrderList(this.$route.params.key, this.pageIndex + 1, false)
          .then(res => {
            if (res.Success) {
              this.pageIndex++
            }
            this.allLoaded = res.TotalPage <= this.pageIndex
            this.$broadcast('onBottomLoaded', id)
          })
      },
      loadTop (id) {
        this.getOrderList(this.$route.params.key, 1, false)
          .then(() => {
            this.allLoaded = false
            this.pageIndex = 1
            this.$broadcast('onTopLoaded', id)
          })
      },
      payOrder (id) {
        let submitOrder = this.orderList.find(item => item.Id === id)
        let tempType = OrderType.Order
        let tempPrice = submitOrder.TotalAmount
        let tempId = submitOrder.Id
        if (submitOrder.Replenishment) {
          tempType = OrderType.Replenishment
          tempPrice = submitOrder.Replenishment.Money
          tempId = submitOrder.Replenishment.Id
        }
        this.setPayOrder({
          id: tempId,
          orderNo: submitOrder.OrderNo,
          type: tempType,
          totalAmount: tempPrice,
          returnUrl: '/#!/order/' + this.$route.params.key,
          backUrl: '/#!/order/' + this.$route.params.key
        })
        this.genPay(true)
      },
      removeOrder(id) {
        this.showConfirm({
          tip: '是否取消订单？',
          button: '取消订单',
          success: '订单已取消',
          fail: '取消订单失败',
          handle: () => {
            this.setSubmitLoading(true, '正在取消订单...')
            return this.cancelOrder(this.$route.params.key, id)
          }
        })
      }
    },
    route: {
      data ({ to: { params: { key } } }) {
        if (this.orderList.length > 0) return {}
        return this.getOrderList(key, 1, true)
          .then(()=> {

          })
      }
    }
  }
</script>
