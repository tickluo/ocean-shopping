<template>
  <div>
    <div class="margin_top_08">

      <article class="order_wrap" v-for="order in orderList">
        <h4 class="order_number">
          <div class="real_number">
            订单:<span class="font-weight_6">{{order.OrderNo}}</span>
          </div>
        </h4>

        <section class="order_list">
          <display-shopping v-for="shopping in order.GrabAttrs"
                            :cover="shopping.Cover"
                            :name="shopping.Name"
                            :price="afterRatePrice(shopping.WebSiteId,shopping.OriginalPrice"
                            :quantity="shopping.Quantity"
                            :sku="shopping.Sku">
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
    <footer class="shopping_footer pad_left_0">
      <ul class="nav_bot_list">
        <li class="cur_nav">
          <a v-link="{name:'cart'}"> <img :src="images.iconCart" alt="" class="bot_nav_icon"> <span>
                   购物车
               </span> </a>
        </li>
        <li>
          <a v-link="{name:'shopOrder'}"> <img :src="images.iconOrder" alt="" class="bot_nav_icon"> <span>
                   我的订单
               </span> </a>
        </li>
        <li>
          <a href="#"> <img :src="images.iconUser" alt="" class="bot_nav_icon"> <span>
                   个人中心
               </span> </a>
        </li>
      </ul>
    </footer>
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
        this.getOrderList(key, { PageIndex: 1, PageSize: 6 })
          .then(res => {

          })
      }
    }
  }
</script>
