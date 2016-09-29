<template>
  <div>
    <ul class="sec_top_nav">
      <li :class="{cur_order:route === 'shopOrder'}" v-link="{name:'shopOrder'}">
        <a>代购订单</a>
        <img :src="images.iconArrR" alt="" class="right_icon">
        <span class="bot_hr"></span>
      </li>
      <li
        :class="{cur_order:route === 'storeOrderBefore' || route === 'storeOrderAfter'}"
        v-link="{name:'storeOrderBefore',params:{key:$route.params.key}}">
        <img :src="images.iconArrR" alt="" class="right_icon left_icon">
        <a>转运仓库</a>
        <img :src="images.iconArrR" alt="" class="right_icon">
        <span class="bot_hr"></span>
      </li>
      <li :class="{cur_order:route === 'tranOrder'}" v-link="{name:'tranOrder'}">
        <img :src="images.iconArrR" alt="" class="right_icon left_icon">
        <a>转运订单</a>
        <span class="bot_hr"></span>
      </li>
    </ul>
    <router-view class="view" transition="slide-up" transition-mode="out-in" keep-alive>
    </router-view>
    <v-order-footer></v-order-footer>
  </div>
</template>

<script>
  import images from '../../asset/images'
  import vOrderFooter from '../layout/v-order-footer.vue'

  export default{
    data(){
      return {
        images
      }
    },
    components: {
      vOrderFooter
    },
    computed: {
      route () {
        return this.$route.name
      }
    }
  }
</script>
