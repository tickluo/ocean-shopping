<template>
  <div>
    <navbar></navbar>
    <router-view class="router-view" transition="slide-up" transition-mode="out-in" keep-alive></router-view>
  </div>
</template>

<script>
  import Navbar from './components/Navbar.vue'
  import store from './store/store'

  export default {
    name: "App",
    components: {
      Navbar
    },
    store
  }
</script>
