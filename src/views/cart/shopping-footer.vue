<template>
  <footer class="shopping_footer" v-disable-tap>
    <div class="icon_shopping_cart_1">
      <img :src="shoppingCard1" alt="">
      <span class="message_num">3</span>
    </div>
    <div class="into_cart_btn">
      <img class="icon_into_shopping_cart" :src="shoppingCard2"/>
      放入购物车
    </div>
  </footer>
</template>

<script>
  import shoppingCard2 from '../asset/images/icon_shopping_card_2@1.png'
  import shoppingCard1 from '../asset/images/icon_shopping_card_1@1.png'

  export default{
    data(){
      return {
        shoppingCard1, shoppingCard2
      }
    }
  }
</script>
