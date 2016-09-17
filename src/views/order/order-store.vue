<template>
  <div>
    <ul class="third_top_nav">
      <li :class="{on_item:route === 'storeOrderBefore'}">
        <a v-link="{name:'storeOrderBefore',params:{key:$route.params.key}}"><span class="depot">等待商品入库</span>
          <span class="message_num">0</span>
          <span class="bot_hr"></span>
        </a></li>
      <li :class="{on_item:route === 'storeOrderAfter'}">
        <a v-link="{name:'storeOrderAfter',params:{key:$route.params.key}}"><span class="depot">商品已入库</span>
          <span class="message_num">0</span>
          <span class="bot_hr"></span>
        </a></li>
    </ul>

    <div class="margin_top_27">
      <router-view class="view" transition="slide-up" transition-mode="out-in" keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {}
    },
    computed: {
      route () {
        return this.$route.name
      }
    }
  }
</script>
