<template>
  <div class="bg_fff">
    <iframe v-auto-height id="importFrame" name="import_frame"
            width="100%"
            height="100%"
            :src="disclaimerUrl"
            frameborder=auto
            @load="loaded">
    </iframe>
    <footer class="shopping_footer" v-disable-tap>
      <div class="icon_shopping_cart_1" @click="returnBack">
        <img class="icon_go_back_cart icon_back" :src="images.iconGoback" alt="">
        <span class="goback_cart">返回</span>
      </div>
    </footer>
  </div>
</template>

<script>
  import images from '../../asset/images'
  import { DisclaimerUrl } from '../../local/config.enum'

  export default{
    data () {
      return {
        images,
        disclaimerUrl: DisclaimerUrl,
        loading: true
      }
    },
    methods: {
      loaded () {
        this.loading = false
      },
      returnBack () {
        window.history.go(-1)
      }
    }
  }
</script>
