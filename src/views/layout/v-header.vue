<template>
  <div class="header">
    <header class="nav_bar">
      <img class="logo_shopping" :src="logo2" alt="">
      <a class="to_fill_order" v-link="{name:'cart'}">{{title}}</a>
      <div class="online_service" @click="getCustom">
        <img class="icon_online_sever" :src="onlineServer2" alt="">
        <span class="text_online">在线客服</span>
        <!--<span class="message_num">3</span>-->
      </div>
    </header>
  </div>
</template>
<script>
  import logo2 from '../../asset/images/six_city_shopping@2x.png'
  import onlineServer2 from '../../asset/images/icon_online_server@2x.png'
  import config from '../../../config/_base.config'

  export default {
    data: function () {
      return {
        logo2,
        onlineServer2
      }
    },
    props: ['title'],
    methods: {
      getCustom () {
        window.location.href = config.custom_service_url
      }
    }
  }
</script>
