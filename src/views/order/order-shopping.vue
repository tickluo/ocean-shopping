<template>
  <div>
    <div class="margin_top_08">
      <article class="order_wrap" v-for="order in orderList">
        <h4 class="order_number" v-link="{name:'shopOrderDetail',params:{id:order.Id}}">
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
                          :state_name="shopping.ProductStautName"
                          :express="shopping.ExpressNumber">
        </display-shopping>
        <div class="pay_money_wrap"
             v-if="order.OrderStatus === OrderStatus.OrderPending || order.Replenishment">
          <div class="font_28" v-if="order.Replenishment">{{order.Replenishment.Reason}}
            <span class="font-weight_6">+RMB {{order.Replenishment.Money}}</span>
          </div>
          <a class="font_size_30 cancel_order_btn" @click="removeOrder(order.Id)">取消订单</a>
          <a class="font_size_30" @click="payOrder(order.Id)">去付款</a>
        </div>
      </article>
    </div>
    <div id="orderShopping"></div>
  </div>
</template>

<script>
  import images from '../../asset/images'
  import displayShopping from '../layout/display-shopping.vue'
  import { orders, user, app } from '../../store/action'
  import { OrderStatus, OrderType } from '../../local/state.enum'

  export default{
    data(){
      return {
        images,
        OrderStatus
      }
    },
    components: {
      displayShopping
    },
    vuex: {
      getters: {
        orderList: state => state.orders.orderList
      },
      actions: {
        getOrderList: orders.getOrderList,
        setPayOrder: user.setPayOrder,
        genPay: app.genPay,
        cancelOrder: orders.cancelOrder
      }
    },
    methods: {
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
        this.cancelOrder(this.$route.params.key, id)
      }
    },
    route: {
      data ({ to: { params: { key } } }) {
        return this.getOrderList(key, { PageIndex: 1, PageSize: 6 })
          .then(res => {
          })
      },
      waitForData: true
    }
  }
</script>
