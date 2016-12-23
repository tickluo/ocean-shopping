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
      <empty v-if="isEmpty" :e-text="eText" :e-src="images.eOrderTransport"></empty>
      <div class="box2">
        <article class="order_wrap" v-for="tranOrder in tranOrderList"
                 v-link="{name:'tranOrderDetail',params:{id:tranOrder.Id}}">
          <h4 class="order_number">
            <div class="real_number">
              转运:<span class="font-weight_6"> {{tranOrder.ShippingNo}}</span>
            </div>
            <span class="text_align_r">
                {{tranOrder.ShippingCompanyName}}
            </span>
          </h4>
          <display-shopping v-for="shopping in tranOrder.GrabAttributes"
                            :cover="shopping.Cover"
                            :name="shopping.Name"
                            :price="shopping.Price"
                            :quantity="shopping.Quantity"
                            :sku="shopping.Sku"
                            :state="shopping.ProductStauts"
                            :state_name="shopping.ProductStautName"
                            :express="shopping.ExpressNumber">
          </display-shopping>
          <div class="total_merch_num">
            <a>共 <strong>{{tranOrder.PackageCount}}</strong> 个商品，查看全部</a>
          </div>

          <div class="pay_money_wrap">
            <div class="font_28" v-if="tranOrder.Replenishment">{{tranOrder.Replenishment.Reason}}
              <span class="font-weight_6">+RMB {{tranOrder.Replenishment.Money}}</span>
            </div>
            <div class="font_28" v-if="!tranOrder.Replenishment">
              {{getStateMsg(tranOrder)}}
            </div>
            <a class="font_size_30"
               v-if="needPay(tranOrder.ShippingStatus,tranOrder.Replenishment)"
               @click.stop="payOrder(tranOrder.Id)">去付款</a>
            <a class="font_size_30" v-if="!tranOrder.Replenishment && tranOrder.ShippingStatus === 4"
               @click.stop="confirmGoods(tranOrder.Id)">确认收货</a>
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
      <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up">
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
<style scoped>

</style>
<script>
  import Scroller from 'vux/src/components/scroller'
  import VLoading from '../../components/v-loading.vue'
  import RoateFade from '../../components/c-fade.vue'
  import { orders, user, app } from '../../store/action'
  import { ShipStatus, OrderType } from '../../local/state.enum'
  import displayShopping from '../layout/display-shopping.vue'
  import Empty from '../../components/empty.vue'
  import images from '../../asset/images'

  export default{
    data(){
      return {
        images,
        eText: "还没有转运单",
        pullupStatus: 'default',
        pageIndex: 1,
        allLoaded: false,
        isEmpty: false,
        pullupConfig: {
          pullUpHeight: 80,
          height: 80,
        },
        pulldownConfig: {
          height: 60,
        }
      }
    },
    components: {
      Scroller,
      RoateFade,
      displayShopping,
      VLoading,
      Empty
    },
    vuex: {
      getters: {
        tranOrderList: state => state.orders.tranOrderList
      },
      actions: {
        getTranOrderList: orders.getTranOrderList,
        setPayOrder: user.setPayOrder,
        genPay: app.genPay,
        receiptGoods: orders.receiptGoods,
        showConfirm: app.showConfirm,
        setSubmitLoading: app.setSubmitLoading
      }
    },
    methods: {
      getStateMsg (tranOrder) {
        if (tranOrder.ShippingStatuName === '已取消' && tranOrder.ShippingCancelReasonName) {
          return tranOrder.ShippingStatuName + '：' + tranOrder.ShippingCancelReasonName
        }
        return tranOrder.ShippingStatuName
      },
      needPay (statusId, hasReplenishment) {
        return statusId === ShipStatus.ShipPending || hasReplenishment
      },
      loadMore (uuid) {
        if (this.isEmpty) return this.$broadcast('pullup:disable', uuid)
        this.getTranOrderList(this.pageIndex + 1)
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
        this.getTranOrderList(1)
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
        let submitOrder = this.tranOrderList.find(item => item.Id === id)
        let tempType = OrderType.Shipping
        let tempPrice = submitOrder.TotalAmount
        let tempId = submitOrder.Id
        if (submitOrder.Replenishment) {
          tempId = submitOrder.Replenishment.Id
          tempType = OrderType.Replenishment
          tempPrice = submitOrder.Replenishment.Money
        }
        this.setPayOrder({
          id: tempId,
          orderNo: submitOrder.ShippingNo,
          type: tempType,
          totalAmount: tempPrice,
          returnUrl: `/#!/order/transport`,
          backUrl: `/#!/order/transport`
        })
        this.genPay(true)
      },
      confirmGoods (id) {
        this.showConfirm({
          tip: '是否已收到包裹？',
          button: '确认收货',
          success: '确认收货成功',
          fail: '确认收货失败',
          handle: () => {
            this.setSubmitLoading(true, '正在确认收货...')
            return this.receiptGoods(id)
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
        if (this.tranOrderList.length > 0) return {}
        return this.getTranOrderList(1)
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
