<template>
  <div>
    <ul class="sec_top_nav">
      <li :class="{cur_order:route === 'shopOrder'}" v-link="{name:'shopOrder'}">
        <a href="#">代购订单</a>
        <img :src="images.iconArrR" alt="" class="right_icon">
        <span class="bot_hr"></span>
      </li>
      <li :class="{cur_order:route === 'storeOrder'}" v-link="{name:'storeOrder'}">
        <img :src="images.iconArrR" alt="" class="right_icon left_icon">
        <a href="#">转运仓库</a>
        <img :src="images.iconArrR" alt="" class="right_icon">
        <span class="bot_hr"></span>
      </li>
      <li :class="{cur_order:route === 'tranOrder'}" v-link="{name:'tranOrder'}">
        <img :src="images.iconArrR" alt="" class="right_icon left_icon">
        <a href="#">转运订单</a></li>
      <span class="bot_hr"></span>
    </ul>
    <router-view class="view" transition="slide-up" transition-mode="out-in" keep-alive>
    </router-view>
  </div>
</template>

<script>
  import images from '../../asset/images'

  export default{
    data(){
      return {
        images
      }
    },
    computed: {
      route () {
        return this.$route.name
      }
    }
  }
</script>
