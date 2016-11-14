<template>
  <div class="margin_top_08 margin_bot_08" v-fix-bottom>
    <load-more :top-method="loadTop"
               :bottom-method="loadBottom"
               :bottom-all-loaded="allLoaded"
               :auto-fill="false">
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
            {{tranOrder.ShippingStatuName}}
          </div>
          <a class="font_size_30"
             v-if="needPay(tranOrder.ShippingStatus,tranOrder.Replenishment)"
             @click.stop="payOrder(tranOrder.Id)">去付款</a>
          <a class="font_size_30" v-if="!tranOrder.Replenishment && tranOrder.ShippingStatus === 4"
             @click.stop="confirmGoods(tranOrder.Id)">确认收货</a>
        </div>
      </article>
    </load-more>
  </div>
</template>

<script>
  import LoadMore from '../../components/c-loadmore.vue'
  import { orders, user, app } from '../../store/action'
  import { ShipStatus, OrderType } from '../../local/state.enum'
  import displayShopping from '../layout/display-shopping.vue'

  export default{
    data(){
      return {
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
      needPay (statusId, hasReplenishment) {
        return statusId === ShipStatus.ShipPending || hasReplenishment
      },
      loadBottom (id) {
        this.getTranOrderList(this.$route.params.key, this.pageIndex + 1, false)
          .then(res => {
            if (res.Success) {
              this.pageIndex++
            }
            this.allLoaded = res.TotalPage <= this.pageIndex
            this.$broadcast('onBottomLoaded', id)
          })
      },
      loadTop (id) {
        this.getTranOrderList(this.$route.params.key, 1, false)
          .then(() => {
            this.allLoaded = false
            this.pageIndex = 1
            this.$broadcast('onTopLoaded', id)
          })
      },
      payOrder (id) {
        let submitOrder = this.tranOrderList.find(item => item.Id === id)
        let tempType = OrderType.Order
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
          returnUrl: `/#!/order/${this.$route.params.key}/transport`,
          backUrl: `/#!/order/${this.$route.params.key}/transport`
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
            return this.receiptGoods(this.$route.params.key, id)
          }
        })
      }
    },
    route: {
      data ({ to: { params: { key } } }) {
        if (this.tranOrderList.length > 0) return {}
        return this.getTranOrderList(key, 1, true)
          .then(()=> {

          })
      }
    }
  }
</script>
