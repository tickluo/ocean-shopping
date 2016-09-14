<template>
  <section class="pop_wrap_phone" v-show="visible">
    <div class="real_pop">
      <img :src="images.iconWarn" alt="" class="icon_warn">
      <p class="font_size_30">
        请填写您的手机号
      </p>
    </div>
  </section>
</template>

<script>
  import images from '../asset/images'

  export default{
    props: ['visible'],
    data(){
      return {
        images
      }
    }
  }
</script>
