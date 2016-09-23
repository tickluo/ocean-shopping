<template>
  <div class="margin_top_08">
    <article class="order_wrap" v-for="tranOrder in tranOrderList">
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
      <div class="total_merch_num" v-link="{name:'tranOrderDetail',params:{id:tranOrder.Id}}">
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
           @click="payOrder(tranOrder.Id)">去付款</a>
        <a class="font_size_30" v-if="!tranOrder.Replenishment && tranOrder.ShippingStatus === 4" href="#">确认收货</a>
      </div>
    </article>
  </div>
</template>

<script>
  import { orders, user, app } from '../../store/action'
  import { ShipStatus, OrderType } from '../../local/state.enum'
  import displayShopping from '../layout/display-shopping.vue'

  export default{
    data(){
      return {}
    },
    components: {
      displayShopping
    },
    vuex: {
      getters: {
        tranOrderList: state => state.orders.tranOrderList
      },
      actions: {
        getTranOrderList: orders.getTranOrderList,
        setPayOrder: user.setPayOrder,
        genPay: app.genPay
      }
    },
    methods: {
      needPay (statusId, hasReplenishment) {
        return statusId === ShipStatus.ShipPending || hasReplenishment
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
      }
    },
    route: {
      data ({ to: { params: { key } } }) {
        return this.getTranOrderList(key, { PageIndex: 1, PageSize: 6 })
          .then(res => {
            if (res.Success) {
            }
          })
      },
      waitForData: true
    }
  }
</script>
