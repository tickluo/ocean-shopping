<template>
  <div>
    <ul class="track_list">
      <li v-for="info in expressInfo">
        <span class="icon_rect" :class="{'icon_rect_gray':$index !== 0}"></span>
        <div class="track_list_con">
          <h4 class="tit2">
            {{info.Content}}
          </h4>
          <time>
            {{info.CurrentTime}}
          </time>
        </div>
      </li>
    </ul>

    <footer class="shopping_footer">
      <div class="icon_shopping_cart_1" @click="returnBack">
        <img class="icon_go_back_cart icon_back" :src="images.iconGoback" alt="">
        <span class="goback_cart">返回</span>
      </div>
    </footer>
  </div>
</template>

<script>
  import images from '../../asset/images'

  export default{
    data () {
      return {
        images
      }
    },
    methods: {
      returnBack () {
        window.history.go(-1)
      }
    },
    vuex: {
      getters: {
        expressInfo: state => state.orders.expressInfo
      }
    }
  }
</script>
