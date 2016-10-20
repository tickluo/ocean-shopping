<template>
  <div>
    <div class="roate_fade_wrap">
      <img class="roate_fade" :src="images.roateFade">
    </div>
  </div>
</template>

<script>
  import imageModule from '../asset/images'
  export default{
    data(){
      let images = imageModule
      return {
        images
      }
    },
    components: {}
  }
</script>
