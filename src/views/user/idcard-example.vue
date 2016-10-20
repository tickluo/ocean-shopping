<template>
  <div>
    <article class="card_wrap">
      <p class="card_tips">身份证照片必须清晰、无水印、死角边框齐全，且身份证未过期。否则包裹将无法清关。
      </p>
      <section class="the_card_block">

        <h4 class="front_side_card">身份证正面</h4>
        <div class="card_img_box">
          <img :src="images.cardFront" alt="">
        </div>

        <h4 class="front_side_card">身份证反面</h4>
        <div class="card_img_box">
          <img :src="images.cardBack" alt="">
        </div>
      </section>
    </article>
    <footer class="shopping_footer">
      <div class="icon_shopping_cart_1" @click="returnBack">
        <img class="icon_go_back_cart icon_back" :src="images.iconGoback" alt="">
        <span class="goback_cart">返回</span></div>
    </footer>
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
    methods:{
      returnBack () {
        window.history.go(-1)
      }
    }
  }
</script>
