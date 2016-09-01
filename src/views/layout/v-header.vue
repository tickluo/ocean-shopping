<template>
  <header class="nav_bar">
    <img class="logo_shopping" :src="getLogo" alt="">
    <a class="to_fill_order" href="#">填写代购单</a>
    <div class="online_service">
      <img class="icon_online_sever" :src="onlineServer2" alt="">
      <span class="text_online">在线客服</span>
      <span class="message_num">3</span>
    </div>
  </header>
</template>
<style>

</style>
<script>
  import logo2 from '../../asset/images/six_city_shopping@2x.png'
  import onlineServer2 from '../../asset/images/icon_online_server@2x.png'

  export default {
    compute: {
      getLogo: ()=> {
        return logo2
      },
      getServer:()=>{
        return onlineServer2
      }
    }
  }
</script>
