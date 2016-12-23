<template>
  <div>
    <div class="empty_wrap">
      <img :src="eSrc">
      <p>{{eText}}</p>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
      }
    },
    components: {},
    props:["eText","eSrc"]
  }
</script>
