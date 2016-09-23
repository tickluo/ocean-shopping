<template>
  <div>
    <article class="order_wrap" v-for="pac in packageList">
      <h4 class="order_number">
        <div class="real_number">
          包裹: <span class="font-weight_6">{{pac.PackageNo}}</span>
        </div>
        <span class="text_align_r">{{pac.ShippingCompanyName}}</span>
      </h4>
      <display-shopping v-for="shopping in pac.GrabAttrs"
                        :cover="shopping.Cover"
                        :name="shopping.Name"
                        :price="shopping.Price"
                        :quantity="shopping.Quantity"
                        :sku="shopping.Sku">
      </display-shopping>
      <div class="total_merch_num" v-link="{name:'storeOrderDetail',params:{id:pac.Id}}">
        <a href="#">共 <strong>{{pac.GrabAttributeCount}}</strong> 个商品，查看全部</a>
      </div>
      <div class="pay_money_wrap"
           v-if="pac.ReplenishmentStatus !== 2"
           @click="submit(pac.Id,pac.ShippingCompanyId)">
        <div class="font_28">已入库,可提交转运</div>
        <a class="font_size_30">提交转运</a>
      </div>
      <div class="pay_money_wrap" v-if="pac.ReplenishmentStatus === 2">
        <div class="font_28">{{pac.Replenishment.Reason}}
          <span class="font-weight_6">+RMB {{pac.Replenishment.Money}}</span>
        </div>
        <a class="font_size_30" href="#">去付款</a>
      </div>
    </article>
  </div>
</template>

<script>
  import displayShopping from '../layout/display-shopping.vue'
  import { orders } from '../../store/action'

  export default{
    data(){
      return {}
    },
    vuex: {
      getters: {
        packageList: state => state.orders.packageListAfter
      },
      actions: {
        setDefaultPid: orders.setDefaultPid
      }
    },
    methods: {
      submit (pid, sid) {
        this.setDefaultPid(pid)

        this.$router.go({ name: 'submitStore', params: { id: sid, type: 'new' } })
      }
    },
    components: {
      displayShopping
    }
  }
</script>
