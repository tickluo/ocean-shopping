<template>
  <div class="top_leave_wrap" v-if="loading">
    <div class="loading_wrap" v-if="!submitLoading.loading">
      <div class="roate_icon_load">
        <img class="load_img" :src="images.loadingImage" alt="">
      </div>
      <p class="load_txt">
        加载中，请稍后...
      </p>
    </div>
    <section class="pop_wrap_phone" v-if="submitLoading.loading">
      <div class="real_pop">
        <img :src="images.roateLoadImg" alt="" class="icon_warn roate_load_img">
        <p class="font_size_30">
          {{submitLoading.message}}
        </p>
      </div>
    </section>
  </div>
</template>

<script>
  import images from '../asset/images'

  export default{
    data(){
      return {
        images
      }
    },
    vuex: {
      getters: {
        loading: state=>state.app.loading,
        submitLoading: state => state.app.submitLoading
      }
    }
  }
</script>
