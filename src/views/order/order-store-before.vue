<template>
  <div class="mar_bot_10">
    <article class="order_wrap" v-for="package in packageList"
             v-link="{name:'storeOrderDetail',params:{id:package.Id}}">
      <h4 class="order_number">
        <div class="real_number">
          包裹: <span class="font-weight_6">{{package.PackageNo}}</span>
        </div>
        <span class="text_align_r">{{package.ShippingCompanyName}}</span>
      </h4>
      <display-shopping v-for="shopping in package.GrabAttrs"
                        :cover="shopping.Cover"
                        :name="shopping.Name"
                        :price="shopping.Price"
                        :quantity="shopping.Quantity"
                        :sku="shopping.Sku">
      </display-shopping>
      <div class="total_merch_num">
        <a>共 <strong>{{package.GrabAttributeCount}}</strong> 个商品，查看全部</a>
      </div>
      <div class="link_transport"
           v-if="package.ExpressNumber"
           @click.stop="expressCheck(package)">
        {{package.PackageStautsName}}，<a>查看物流</a>
      </div>
    </article>
  </div>
</template>

<script>
  import displayShopping from '../layout/display-shopping.vue'
  import { ProductStatus } from '../../local/state.enum'
  import { orders, app } from '../../store/action'

  export default{
    data(){
      return {
        ProductStatus
      }
    },
    vuex: {
      getters: {
        packageList: state => state.orders.packageListBefore
      },
      actions: {
        showAlert: app.showAlert,
        setExpressSite: orders.setExpressSite
      }
    },
    methods: {
      expressCheck (pac) {
        this.setExpressSite({
          name: pac.ExpressCompanyCode,
          number: pac.ExpressNumber
        })
        return this.$router.go({ name: 'expressSite' })
      }
    },
    components: {
      displayShopping
    }
  }
</script>
