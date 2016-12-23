<template>
  <div class="mar_top_17" v-fix-bottom="ss">
    <empty v-if="packageList.length === 0" :e-text="eText" :e-src="images.eOrderBefore"></empty>
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
  import Empty from '../../components/empty.vue'
  import images from '../../asset/images'
  export default{
    data(){
      return {
        ProductStatus,
        images,
        eText: "还没有待入库的商品"
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
      displayShopping,
      Empty
    }
  }
</script>
