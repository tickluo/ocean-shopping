<template>
  <div>
    <v-loading v-if="$loadingRouteData"></v-loading>
    <div v-if="!$loadingRouteData" class="mar_bot_08" v-fix-bottom="ss">
      <article class="order_wrap">
        <h4 class="order_number">
          <div class="real_number">
            订单:<span class="font-weight_6">{{storeDetail.PackageNo}}</span>
          </div>
        </h4>
        <section class="kd_company">
          <div>转运公司：<strong>{{storeDetail.ShippingCompanyName}}</strong></div>
          <div>包裹重量： <strong>{{storeDetail.Weight}}g</strong></div>
          <div>下单时间：{{storeDetail.StorageTime}}</div>
        </section>
        <display-shopping v-for="shopping in storeDetail.GrabAttrs"
                          :cover="shopping.Cover"
                          :name="shopping.Name"
                          :price="shopping.Price"
                          :quantity="shopping.Quantity"
                          :sku="shopping.Sku">
        </display-shopping>
      </article>
    </div>
    <section class="summary_money" v-disable-tap>
      <div class="summary_con">
        <span class="summary_left">订单总额</span>
        <strong class="text_align_r">RMB {{totalPrice}}</strong>
      </div>
    </section>

    <footer class="shopping_footer" v-disable-tap>
      <div class="icon_shopping_cart_1" v-link="{name:'storeOrderBefore'}">
        <img class="icon_go_back_cart icon_back" :src="images.iconGoback" alt="">
        <span class="goback_cart">返回</span>
      </div>
      <div class="into_cart_btn" @click="submit(storeDetail.Id,storeDetail.ShippingCompanyId)"
           v-link="{name:'submitStore',params:{id:storeDetail.ShippingCompanyId}}">
        <img class="icon_into_shopping_cart" :src="images.iconOk">
        <span class="dis_inline_block">提交转运</span>
      </div>
    </footer>
  </div>
</template>

<script>
  import images from '../../asset/images'
  import VLoading from '../../components/v-loading.vue'
  import displayShopping from '../layout/display-shopping.vue'
  import { toFloatFixed } from '../../services/util.svc'
  import { orders } from '../../store/action'

  export default{
    data(){
      return {
        images
      }
    },
    vuex: {
      getters: {
        storeDetail: state => state.orders.storeDetail
      },
      actions: {
        setStoreDetail: orders.setStoreDetail,
        setDefaultPid: orders.setDefaultPid
      }
    },
    components: {
      displayShopping,
      VLoading
    },
    methods: {
      submit (pid, sid) {
        this.setDefaultPid(pid)
        this.$router.go({ name: 'submitStore', params: { id: sid, type: 'new' } })
      }
    },
    computed: {
      totalPrice () {
        if (!this.storeDetail.GrabAttrs)
          return 0
        if (this.storeDetail.GrabAttrs.length === 1) {
          let shopping = this.storeDetail.GrabAttrs[0]
          return toFloatFixed(shopping.Price * shopping.Quantity, 2)
        }
        return toFloatFixed(this.storeDetail.GrabAttrs
          .reduce((pre, cur) => {
            return pre.Price * pre.Quantity + cur.Price * cur.Quantity
          }), 2)
      }
    },
    route: {
      data ({ to: { params: { id } } }) {
        if (this.storeDetail.Id && this.storeDetail.Id === id * 1) {
          return {}
        }
        return this.setStoreDetail(id)
          .then(res => {
          })
      }
    }
  }
</script>
