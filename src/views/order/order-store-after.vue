<template>
  <div class="mar_top_17" v-fix-bottom="ss">
    <empty v-if="packageList.length === 0" :e-text="eText" :e-src="images.eOrderAfter"></empty>
    <article class="order_wrap" v-for="pac in packageList"
             v-link="{name:'storeOrderDetail',params:{id:pac.Id}}">
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
      <div class="total_merch_num">
        <a>共 <strong>{{pac.GrabAttributeCount}}</strong> 个商品，查看全部</a>
      </div>
      <div class="pay_money_wrap"
           v-if="pac.ReplenishmentStatus !== 2"
           @click.stop="submit(pac.Id,pac.ShippingCompanyId)">
        <div class="font_28">已入库,可提交转运</div>
        <a class="font_size_30">提交转运</a>
      </div>
      <div class="pay_money_wrap" v-if="pac.ReplenishmentStatus === 2">
        <div class="font_28">{{pac.Replenishment.Reason}}
          <span class="font-weight_6">+RMB {{pac.Replenishment.Money}}</span>
        </div>
        <a class="font_size_30">去付款</a>
      </div>
    </article>
  </div>
</template>

<script>
  import displayShopping from '../layout/display-shopping.vue'
  import { orders } from '../../store/action'
  import Empty from '../../components/empty.vue'
  import images from '../../asset/images'
  export default{
    data(){
      return {
        images,
        eText: "还没有已入库的商品"
      }
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
      displayShopping,
      Empty
    }
  }
</script>
