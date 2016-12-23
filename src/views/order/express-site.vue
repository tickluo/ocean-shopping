<template>
  <div class="bg_fff" v-fix-bottom="ss" style="bottom:0rem">
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
    <iframe id="importFrame" name="import_frame"
            width=100%
            :src="expressUrl"
            frameborder=auto
            @load="loaded">
    </iframe>
    <v-return-footer></v-return-footer>
  </div>
</template>

<script>
  import images from '../../asset/images'
  import { ExpressUrl } from '../../local/config.enum'
  import vReturnFooter from '../layout/v-return-footer.vue'

  export default {
    data(){
      return {
        images,
        loading: true
      }
    },
    components: { vReturnFooter },
    computed: {
      expressUrl () {
        return `${ExpressUrl}${this.express.number}`
      }
    },
    methods: {
      loaded () {
        this.loading = false
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
