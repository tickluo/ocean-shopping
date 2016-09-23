<template>
  <div>
    <div class="mar_bot_9">

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
    <section class="summary_money">
      <div class="summary_con">
        <span class="summary_left">订单总额</span>
        <strong class="text_align_r">RMB {{totalPrice}}</strong>
      </div>
    </section>

    <footer class="shopping_footer">
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
  import displayShopping from '../layout/display-shopping.vue'
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
      displayShopping
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
          return parseFloat(shopping.Price * shopping.Quantity).toFixed(2)
        }
        return parseFloat(this.storeDetail.GrabAttrs
          .reduce((pre, cur) => {
            return pre.Price * pre.Quantity + cur.Price * cur.Quantity
          })).toFixed(2)
      }
    },
    route: {
      data ({ to: { params: { id, key } } }) {
        if (this.storeDetail.Id && this.storeDetail.Id === id) {
          return this.storeDetail
        }
        return this.setStoreDetail(key, id)
          .then(res => {
          })
      },
      waitForData: true
    }
  }
</script>
