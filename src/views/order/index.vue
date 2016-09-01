<template>
  <div>
    <v-header/>
    <h1>{{msg}}</h1>
    <router-view></router-view>
  </div>
</template>
<style>
  body {
    background-color: #ff0000;
  }
</style>
<script>
  import HeaderComponent from '../layout/v-header.vue'
  export default{
    data(){
      return {
        msg: 'hello vue'
      }
    },
    components: {
      HeaderComponent,
    }
  }
</script>
