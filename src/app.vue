<template>
  <div>
    <v-header :title="title"></v-header>
    <router-view class="view" transition="slide-up" transition-mode="out-in" keep-alive></router-view>
  </div>
</template>

<script>
  import store from './store/store'
  import { VHeader } from './components'
  import { app } from './store/action'

  export default {
    name: "App",
    store,
    computed: {
      title () {
        return this.$route.title
      }
    },
    vuex: {
      actions: {
        setAppCurrency: app.setAppCurrency
      }
    },
    components: {
      VHeader
    },
    ready() {
      this.setAppCurrency(this.$route.params.key)
    }
  }
</script>
