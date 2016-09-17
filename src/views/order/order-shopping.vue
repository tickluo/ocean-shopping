<template>
  <div>
    <div class="margin_top_08">

      <article class="order_wrap" v-for="order in orderList">
        <h4 class="order_number" v-link="{name:'shopOrderDetail',params:{id:order.Id}}">
          <div class="real_number">
            订单:<span class="font-weight_6">{{order.OrderNo}}</span>
          </div>
        </h4>

        <section class="order_list">
          <display-shopping v-for="shopping in order.GrabAttrs"
                            :cover="shopping.Cover"
                            :name="shopping.Name"
                            :price="shopping.OriginalPrice"
                            :quantity="shopping.Quantity"
                            :sku="shopping.Sku"
                            :coupon="shopping.Coupon"
                            :is_buy="shopping.IsBuy">
          </display-shopping>
          <div class="order_static_wrap">
            <div class="order_static">
              <span class="icon_rect"></span>
              <span class="font_size_25">到达转运仓库</span>
            </div>
          </div>
        </section>
      </article>
    </div>

  </div>
</template>

<script>
  import images from '../../asset/images'
  import displayShopping from '../layout/display-shopping.vue'
  import { orders } from '../../store/action'

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
