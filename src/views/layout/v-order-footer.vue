<template>
  <footer class="shopping_footer pad_left_0">
    <ul class="nav_bot_list">
      <li class="cur_nav">
        <a v-link="{name:'cart'}"> <img :src="images.iconCart" alt="" class="bot_nav_icon">
          <span>购物车</span> </a>
      </li>
      <li>
        <a v-link="{name:'shopOrder'}"> <img :src="images.iconOrder" alt="" class="bot_nav_icon">
          <span>我的订单</span> </a>
      </li>
      <li>
        <a href="#"> <img :src="images.iconUser" alt="" class="bot_nav_icon">
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
    }
  }
</script>
