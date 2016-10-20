<template>
  <div>
    <section class="transport_company">
      <h4>物流公司: <strong>{{express.name}}</strong></h4>
      <h4>物流单号: <strong>{{express.number}}</strong></h4>
    </section>
    <section class="pop_wrap_phone" v-if="loading">
      <div class="real_pop">
        <img :src="images.roateLoadImg" alt="" class="icon_warn roate_load_img">
        <p class="font_size_30">
          正在加载...
        </p>
      </div>
    </section>
    <iframe name="import_frame"
            width=100%
            height=80%
            :src="expressUrl"
            frameborder=auto
            @load="loaded">
    </iframe>

    <footer class="shopping_footer">
      <div class="icon_shopping_cart_1" @click="returnBack">
        <img class="icon_go_back_cart icon_back" :src="images.iconGoback" alt="">
        <span class="goback_cart">返回</span>
      </div>
    </footer>
  </div>
</template>

<script>
  import images from '../../asset/images'
  import { ExpressUrl } from '../../local/config.enum'
  export default {
    data(){
      return {
        images,
        loading: true
      }
    },
    computed: {
      expressUrl () {
        return `${ExpressUrl}${this.express.number}`
      }
    },
    methods: {
      loaded () {
        this.loading = false
      },
      returnBack () {
        window.history.go(-1)
      }
    },
    vuex: {
      getters: {
        express: state=>state.orders.expressSite
      }
    },
    route: {
      data () {
        this.loading = true
        return {}
      }
    }
  }
</script>
