<template>
  <div>
    <router-view class="view" transition="slide-up" transition-mode="out-in" keep-alive></router-view>
  </div>
</template>

<script>
  import store from './store/store'

  export default {
    name: "App",
    store
  }
</script>
