<template>
  <div>
    <ul class="third_top_nav">
      <li :class="{on_item:route === 'storeOrderBefore'}">
        <a v-link="{name:'storeOrderBefore',params:{key:$route.params.key}}"><span class="depot">等待商品入库</span>
          <span class="message_num">{{beforeCount}}</span>
          <span class="bot_hr"></span>
        </a></li>
      <li :class="{on_item:route === 'storeOrderAfter'}">
        <a v-link="{name:'storeOrderAfter',params:{key:$route.params.key}}"><span class="depot">商品已入库</span>
          <span class="message_num">{{afterCount}}</span>
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
  import { orders } from '../../store/action'

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
      data ({ to: { params: { key } } }) {
        return this.getPackageList(key)
          .then(res => {
            if (res.Success) {
            }
          })
      },
      waitForData: true
    }
  }
</script>
