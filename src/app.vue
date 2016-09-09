<template>
  <div>
    <v-header title="title"></v-header>
    <router-view class="view" transition="slide-up" transition-mode="out-in" keep-alive></router-view>
  </div>
</template>

<script>
  import store from './store/store'
  import { VHeader } from './components'

  export default {
    name: "App",
    store,
    components: {
      VHeader
    }
  }
</script>
