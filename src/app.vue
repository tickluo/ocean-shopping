<template>
  <div>
    <v-header v-disable-tap :title="title"></v-header>
    <router-view class="view" transition="expand" keep-alive></router-view>
    <pay-form v-if="genPay"></pay-form>
    <c-alert></c-alert>
    <c-confirm></c-confirm>
    <v-handle-loading></v-handle-loading>
    <!--<v-footer v-disable-tap></v-footer>-->
  </div>
</template>

<script>
  import './asset/css/common.css'
  import './asset/css/cart.css'
  import './asset/css/order.css'
  import './asset/css/user.css'
  import store from './store/store'
  import { VHeader, CAlert, CConfirm, VHandleLoading } from './components'
  import PayForm from './views/user/get-pay.vue'

  export default {
    name: "App",
    store,
    computed: {
      title () {
        return this.$route.title
      }
    },
    vuex: {
      getters: {
        genPay: state=>state.app.genPay
      }
    },
    components: {
      VHeader,
      PayForm,
      CAlert,
      VHandleLoading,
      CConfirm
    }
  }
</script>
