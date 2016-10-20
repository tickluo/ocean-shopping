<template>
  <div>
    <company-country v-for="item in companySet" :company="item">
    </company-country>

    <footer class="shopping_footer">
      <div class="icon_shopping_cart_1" v-link="{name:'cart'}">
        <img class="icon_go_back_cart" :src="images.iconShoppingCard_1_1" alt="">
        <span class="goback_cart">返回购物车</span>
      </div>
      <div class="into_cart_btn" v-link="{name:'submit'}">
        <img class="icon_into_shopping_cart" :src="images.iconNext">
        <span class="dis_inline_block">下一步</span>
      </div>
    </footer>
  </div>
</template>

<script>
  import images from '../../asset/images'
  import companyCountry from './company-country.vue'
  import { numberUnique } from '../../services/util.svc'
  import { cart } from '../../store/action'

  export default{
    data(){
      return {
        images
      }
    },
    vuex: {
      getters: {
        selectedShop: state => state.cart.order.selected.filter(item => item.shopping.length > 0),
        cartList: state => state.cart.cartList,
        companySet: state => state.cart.company.companySet
      },
      actions: {
        getDefaultCompany: cart.getDefaultCompany
      }
    },
    computed: {
      countries () {
        return this.selectedShop ?
          numberUnique(this.selectedShop.map(item => item.CountryId)) : []
      }
    },
    components: {
      companyCountry
    },
    route: {
      data({ to: { params: { key } }, from: { name, title } }){
        if (name !== 'selectCompany' && title !== '提交订单') {
          return this.getDefaultCompany(key, this.countries)
            .then(data => {
            })
        }
        return {}
      },
      waitForData: true
    }
  }
</script>
