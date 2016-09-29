<template>
  <section class="pop_wrap_phone" v-if="show">
    <div class="real_pop">
      <img :src="images.iconWarn" alt="" class="icon_warn">
      <p class="font_size_30">
        {{alertMsg}}
      </p>
    </div>
  </section>
</template>

<script>
  import images from '../asset/images'

  export default{
    props: ['visible'],
    vuex: {
      getters: {
        show: state => state.app.alert.show,
        alertMsg: state => state.app.alert.alertMsg
      }
    },
    data(){
      return {
        images
      }
    }
  }
</script>
