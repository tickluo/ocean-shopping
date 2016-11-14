<template>
  <div>
    <ul class="sec_top_nav" v-disable-tap>
      <li :class="{cur_order:route === 'shoporder'}" v-link="{name:'shoporder'}">
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
      <!--<span  class="hr_block"></span>-->
    </ul>

    <router-view class="view"  keep-alive>
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
