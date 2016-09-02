<template>
  <section class="merch_wrap">
    <div class="merch_con">
      <div class="real_card_shopping">
        <img :src="shopping" alt="">
      </div>
      <div class="shopping_text_con">
        <h3 class="shopping_tit">Demi brach-Dreanm Angules-Vertic-O-DI在线客服在线客服在线客服在线客服在线客服在线客服</h3>
        <div class="shop_info_tit">
          <h4 class="merch_shop_tit">
            <img class="shop_logo" :src="logo" alt="">
            维多利亚的秘密
          </h4>
        </div>
        <div class="price_to_shop">
          <span class="merch_price">$42.99</span>
          <a class="to_shop_detail" href="#">官网商品详情</a>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import shopping from '../asset/images/deal_card_shopping@2x.jpg'
  import logo from '../asset/images/shop_logo.png'

  export default{
    data(){
      return {
        logo,shopping
      }
    },
  }
</script>
