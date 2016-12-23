<template>
  <section class="pop_wrap_phone" v-if="submitLoading.loading">
    <div class="real_pop">
      <img :src="images.roateLoadImg" alt="" class="icon_warn roate_load_img">
      <p class="font_size_30">
        {{submitLoading.message}}
      </p>
    </div>
  </section>
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
        submitLoading: state => state.app.submitLoading
      }
    }
  }
</script>
