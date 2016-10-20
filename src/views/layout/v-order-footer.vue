<template>
  <footer class="shopping_footer pad_left_0">
    <ul class="nav_bot_list">
      <li :class="{'cur_nav':routeName === 'cart'}">
        <a v-link="{name:'cart'}">
          <img :src="routeName === 'cart' ? images.iconCartWhite : images.iconCart" alt="" class="bot_nav_icon">
          <span>购物车</span> </a>
      </li>
      <li :class="{'cur_nav':routeTitle === '我的订单'}">
        <a v-link="{name:'shopOrder'}">
          <img :src="routeTitle === '我的订单' ? images.iconOrderWhite : images.iconOrder" alt="" class="bot_nav_icon">
          <span>我的订单</span> </a>
      </li>
      <li>
        <a> <img :src="images.iconUser" alt="" class="bot_nav_icon">
          <span>个人中心</span> </a>
      </li>
    </ul>
  </footer>
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
      routeName () {
        return this.$route.name
      },
      routeTitle () {
        return this.$route.title
      }
    }
  }
</script>
