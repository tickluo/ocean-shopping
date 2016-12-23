<template>
  <div>
    <footer v-if="route === 'main'" class="shopping_footer pad_left_0 footer">
      <ul class="nav_bot_list">
        <li :class="{'cur_nav':routeName === 'cart'}">
          <a v-link="{name:'cart'}">
            <img :src="routeName === 'cart' ? images.iconCartWhite : images.iconCart" alt="" class="bot_nav_icon">
            <span>购物车</span> </a>
        </li>
        <li :class="{'cur_nav':routeTitle === '我的订单'}">
          <a v-link="{name:'shoporder'}">
            <img :src="routeTitle === '我的订单' ? images.iconOrderWhite : images.iconOrder" alt="" class="bot_nav_icon">
            <span>我的订单</span> </a>
        </li>
        <li :class="{'cur_nav':routeTitle === '个人中心'}">
          <a v-link="{name:'userCenter'}">
            <img :src="routeTitle === '个人中心' ? images.iconUserWhite : images.iconUser" alt="" class="bot_nav_icon">
            <span>个人中心</span> </a>
        </li>
      </ul>
    </footer>
    <footer v-if="route === 'back'" class="shopping_footer">
      <div class="icon_shopping_cart_1" @click="returnBack">
        <img class="icon_go_back_cart icon_back" :src="images.iconGoback" alt="">
        <span class="goback_cart">返回</span>
      </div>
    </footer>
    <div>
      <footer class="shopping_footer" v-if="!$route.params.Id" v-disable-tap>
        <div class="icon_shopping_cart_1" v-link="{name:'cart'}">
          <img :src="images.iconShoppingCard_1_2x" alt="">
          <span class="message_num">{{cart_count}}</span></div>
        <a class="into_cart_btn" @click="addToCart()">
          <img class="icon_into_shopping_cart" :src="images.IconShoppingCart_2"/>
          <span class="dis_inline_block">放入购物车</span> </a>
      </footer>

      <footer class="shopping_footer" v-if="$route.params.Id" v-disable-tap>
        <div class="icon_shopping_cart_1" v-link="{name:'cart'}">
          <img class="icon_go_back_cart" :src="images.iconShoppingCard_1_1" alt="">
          <span class="goback_cart">返回购物车</span>
        </div>
        <div class="into_cart_btn">
          <img class="icon_into_shopping_cart" :src="images.iconShoppingCart_2"/>
          <span class="dis_inline_block" @click="addToCart()">保存修改</span>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
  import images from '../../asset/images'

  export default{
    data(){
      return { images }
    },
    computed: {
      route () {
        debugger
        return this.$route
      }
    }
  }
</script>
