<template>
  <div>
    <v-loading v-if="$loadingRouteData"></v-loading>
    <scroller class='scrollable_bar'
              lock-x scrollbar-y
              use-pullup
              use-pulldown
              :pullup-config="pullupConfig"
              :pulldowm-config="pulldownConfig"
              @pullup:loading="loadMore"
              @pulldown:loading="refresh"
              :pullup-status.sync="pullupStatus"
              v-ref:scroller>
      <empty v-if="isEmpty" :e-text="eText" :e-src="images.eOrder"></empty>
      <div class="box2" style="transform-origin: 0px 0px 0px;">
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
            <div class="font_28" v-if="order.Replenishment">{{order.Replenishment.Reason||''}}
              <span class="font-weight_6">+ RMB {{order.Replenishment.Money}}</span>
            </div>
            <a class="font_size_30 cancel_order_btn" @click.stop="removeOrder(order.Id)">取消订单</a>
            <a class="font_size_30" @click.stop="payOrder(order.Id)">去付款</a>
          </div>
        </article>
      </div>
      <div slot="pulldown" class="xs-plugin-pullup-container xs-plugin-pullup-down"
           style="position: absolute; width: 100%; height: 60px; line-height: 60px; top: -60px; text-align: center;">
        <span v-show="pullupStatus === 'default'">
          <roate-fade class="mint-loadmore-spinner" type="fading-circle"></roate-fade></span>
        <span class="pullup-arrow" v-show="(pullupStatus === 'down' || pullupStatus === 'up')"
              :class="{'rotate': pullupStatus === 'up'}">↑</span>
      </div>
      <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up"
      >
        <span v-show="pullupStatus === 'default'"></span>
        <span v-show="allLoaded" style="color:#666;font-size:0.26rem">暂无更多</span>
        <span class="pullup-arrow" v-show="(pullupStatus === 'down' || pullupStatus === 'up') && !allLoaded"
              :class="{'rotate': pullupStatus === 'up'}">↓</span>

        <span v-show="pullupStatus === 'loading'">
          <roate-fade></roate-fade>
        </span>
      </div>

    </scroller>
  </div>
</template>

<script>
  import images from '../../asset/images'
  import displayShopping from '../layout/display-shopping.vue'
  import Scroller from 'vux/src/components/scroller'
  import VLoading from '../../components/v-loading.vue'
  import RoateFade from '../../components/c-fade.vue'
  import Empty from '../../components/empty.vue'
  import { orders, user, app } from '../../store/action'
  import { OrderStatus, OrderType } from '../../local/state.enum'

  export default{
    data () {
      return {
        images,
        eText: "还没有代购订单呢,赶紧去下一单吧",
        pullupStatus: 'default',
        OrderStatus,
        isEmpty: false,
        pageIndex: 1,
        allLoaded: false,
        pullupConfig: {
          pullUpHeight: 80,
          height: 80
        },
        pulldownConfig: {
          height: 60
        }
      }
    },
    components: {
      displayShopping,
      Scroller,
      RoateFade,
      Empty,
      VLoading
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
      loadMore (uuid) {
        if (this.isEmpty) return this.$broadcast('pullup:disable', uuid)
        this.getOrderList(this.pageIndex + 1, false)
          .then(res => {
            if (res.Success) {
              this.pageIndex++
            }
            this.allLoaded = res.TotalPage <= this.pageIndex
            this.allLoaded && this.$broadcast('pullup:disable', uuid)
            this.$nextTick(() => {
              this.$broadcast('pullup:reset', uuid)
            })
          })
      },
      refresh (uuid) {
        this.$broadcast('pullup:disable', uuid)
        if (this.isEmpty) return this.$broadcast('pulldown:disable', uuid)
        this.getOrderList(1)
          .then(() => {
            this.allLoaded = false
            this.$broadcast('pullup:enable', uuid)
            this.pageIndex = 1
            this.$nextTick(() => {
              this.$broadcast('pulldown:reset', uuid)
            })
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
          returnUrl: '/#!/order/',
          backUrl: '/#!/order/'
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
            return this.cancelOrder(id)
              .then(res => {
                this.setSubmitLoading(false)
                return Promise.resolve(res)
              })
          }
        })
      }
    },
    route: {
      data () {
        if (this.orderList.length > 0) return {}
        return this.getOrderList(1)
          .then((res)=> {
            this.empty = !!(res.Success && res.List.length === 0)
            this.$nextTick(() => {
              this.$refs.scroller.reset()
            })
          })
      }
    }
  }
</script>
