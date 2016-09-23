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
        <div class="pay_money_wrap" v-if="order.OrderStatus === OrderStatus.OrderPending || order.Replenishment">
          <div class="font_28" v-if="order.Replenishment">{{order.Replenishment.Reason}}
            <span class="font-weight_6">+RMB {{order.Replenishment.Money}}</span>
          </div>
          <a class="font_size_30 cancel_order_btn" href="#">取消订单</a>
          <a class="font_size_30" href="#">去付款</a>
        </div>
      </article>
    </div>

  </div>
</template>

<script>
  import images from '../../asset/images'
  import displayShopping from '../layout/display-shopping.vue'
  import { orders } from '../../store/action'
  import { OrderStatus } from '../../local/enum'

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
        getOrderList: orders.getOrderList
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
