<template>
  <footer class="shopping_footer" v-disable-tap>
    <div class="icon_shopping_cart_1" @click="returnBack">
      <img class="icon_go_back_cart icon_back" :src="images.iconGoback" alt="">
      <span class="goback_cart">返回</span></div>
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
    methods:{
      returnBack () {
        window.history.go(-1)
      }
    }
  }
</script>
