<template>
  <div>
    <ul class="third_top_nav" v-disable-tap>
      <li :class="{on_item:route === 'storeOrderBefore'}"
          v-link="{name:'storeOrderBefore'}">
        <a><span class="depot">等待商品入库</span>
          <span class="message_num">{{beforeCount}}</span>
          <span class="bot_hr"></span>
        </a></li>
      <li :class="{on_item:route === 'storeOrderAfter'}"
          v-link="{name:'storeOrderAfter'}">
        <a><span class="depot">商品已入库</span>
          <span class="message_num">{{afterCount}}</span>
          <span class="bot_hr"></span>
        </a></li>
    </ul>

    <!--<div class="margin_top_27">-->
    <v-loading v-if="$loadingRouteData"></v-loading>
    <router-view v-if="!$loadingRouteData" class="" keep-alive>
    </router-view>
  </div>
</template>

<script>
  import { orders } from '../../store/action'
  import VLoading from '../../components/v-loading.vue'

  export default{
    computed: {
      route () {
        return this.$route.name
      },
      beforeCount () {
        return this.packageListBefore ? this.packageListBefore.length : 0
      },
      afterCount () {
        return this.packageListAfter ? this.packageListAfter.length : 0
      }
    },
    components: { VLoading },
    vuex: {
      getters: {
        packageListBefore: state => state.orders.packageListBefore,
        packageListAfter: state => state.orders.packageListAfter
      },
      actions: {
        getPackageList: orders.getPackageList
      }
    },
    route: {
      data () {
        return this.getPackageList()
          .then(res => {
            if (res.Success) {
            }
          })
      }
    }
  }
</script>
