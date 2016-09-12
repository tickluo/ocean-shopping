<template>
  <section class="shopping_con_box">
    <h3 class="shopping_cart_tit">
      <c-checkbox :selected="toggle" @click="changeToggle">
      </c-checkbox>
      <img class="shop_brand_logo" :src="imageModule.shopLogo_2" alt="">
      <span class="shop_brand_name">{{title}}</span>
    </h3>
    <cart-item v-for="item in list" :shop_id="shop_id" :item="item">
    </cart-item>
  </section>
</template>

<script>
  import cartItem from './cart-item.vue'
  import imageModule from '../../asset/images'
  import { CCheckbox } from '../../components'
  import { cart } from '../../store/action'

  export default{
    props: ['title', 'list', 'rule', 'shop_id'],
    data(){
      return {
        imageModule,
      }
    },
    vuex: {
      getters: {
        order: state => state.cart.order
      },
      actions: {
        selectShop: cart.selectShop
      }
    },
    computed: {
      toggle () {
        return this.order.selected ? this.order.selected[this.shop_id].selectShop : true
      }
    },
    components: {
      cartItem,
      CCheckbox
    },
    methods: {
      changeToggle () {
        return this.selectShop(!this.toggle, this.shop_id)
      }
    }
  }
</script>
