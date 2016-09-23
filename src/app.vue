<template>
  <div>
    <v-header :title="title"></v-header>
    <router-view class="view" transition="slide-up" transition-mode="out-in" keep-alive></router-view>
    <pay-form v-if="genPay"></pay-form>
  </div>
</template>

<script>
  import store from './store/store'
  import { VHeader } from './components'
  import { app } from './store/action'
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
      },
      actions: {
        setAppCurrency: app.setAppCurrency
      }
    },
    components: {
      VHeader,
      PayForm
    },
    ready() {
      this.setAppCurrency(this.$route.params.key)
    }
  }
</script>
