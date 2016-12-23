<template>
  <div class="top_leave_wrap">
    <div class="loading_wrap">
      <div class="roate_icon_load">
        <img class="load_img" :src="images.loadingImage" alt="">
      </div>
      <p class="load_txt">
        加载中，请稍后...
      </p>
    </div>
  </div>
</template>

<script>
  import images from '../asset/images'

  export default{
    data(){
      return {
        images
      }
    }
  }
</script>
