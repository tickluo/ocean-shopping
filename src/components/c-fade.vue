<template>
  <div>
      <img class="roate_fade" :src="images.roateFade">
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
