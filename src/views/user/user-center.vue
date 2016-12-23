<template>
  <div>
    <div class="pos_height_100" v-fix-bottom="ss">
      <a v-link="{name:'manageAddress'}" class="s_list_box">
        <span class="flex_width">管理地址</span>
        <img :src="images.iconR" alt="" class="icon_right">
      </a>
    </div>
    <v-order-footer></v-order-footer>
  </div>
</template>

<script>
  import images from '../../asset/images'
  import vOrderFooter from '../layout/v-order-footer.vue'

  export default{
    data(){
      return {
        images
      }
    },
    components: { vOrderFooter }
  }
</script>
