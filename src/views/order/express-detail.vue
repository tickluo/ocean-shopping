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
    <v-return-footer></v-return-footer>
  </div>
</template>

<script>
  import vReturnFooter from '../layout/v-return-footer.vue'

  export default{
    components: { vReturnFooter },
    vuex: {
      getters: {
        expressInfo: state => state.orders.expressInfo
      }
    }
  }
</script>
