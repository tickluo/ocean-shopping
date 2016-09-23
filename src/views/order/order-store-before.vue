<template>
  <div>
    <article class="order_wrap" v-for="package in packageList">
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
      <div class="total_merch_num" v-link="{name:'storeOrderDetail',params:{id:package.Id}}">
        <a href="#">共 <strong>{{package.GrabAttributeCount}}</strong> 个商品，查看全部</a>
      </div>
      <div class="link_transport" v-if="package.ExpressNumber">
        {{package.PackageStautsName}}，<a href="#">查看物流</a>
      </div>
    </article>
  </div>
</template>

<script>
  import displayShopping from '../layout/display-shopping.vue'
  import { ProductStatus } from '../../local/state.enum'

  export default{
    data(){
      return {
        ProductStatus
      }
    },
    vuex: {
      getters: {
        packageList: state => state.orders.packageListBefore
      }
    },
    components: {
      displayShopping
    }
  }
</script>
