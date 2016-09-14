<template>
  <div>
    <section class="shopping_con_box" v-for="shop in shoppingList">
      <h3 class="shopping_cart_tit">
        <img class="shop_brand_logo" :src="images.shopLogo_2" alt="">
        <span class="shop_brand_name">{{shop.Title}}</span>
      </h3>
      <div class="shopping_list_block" v-for="shopping in shop.GrabAttrs">
        <!--<div class="shopping_real_con cart_real_con">
          <div class="shopping_cart_list_img"><img :src="shopping.Cover" alt=""></div>
          <div class="shopping_text_con cart_brand_text_con">
            <h3 class="shopping_tit">{{shopping.Name}}</h3>
            <div class="font-weight_6">RMB
              {{afterRatePrice(shopping.WebSiteId,shopping.OriginalPrice)}}x{{shopping.Quantity}}
            </div>
            <p class="brand_attr"> {{shopping.Sku}}</p>
          </div>
        </div>-->
        <display-shopping :cover="shopping.Cover"
                          :name="shopping.Name"
                          :price="afterRatePrice(shopping.WebSiteId,shopping.OriginalPrice"
                          :quantity="shopping.Quantity"
                          :sku="shopping.Sku">
        </display-shopping>
      </div>
    </section>
  </div>
</template>

<script>
  import images from '../../asset/images'
  import DisplayShopping from '../layout/display-shopping.vue'

  export default{
    data(){
      return {
        images
      }
    },
    components: {
      DisplayShopping
    },
    vuex: {
      getters: {
        order: state => state.cart.order,
        cartList: state => state.cart.cartList,
        rates: state => state.cart.rates
      }
    },
    computed: {
      shoppingList () {
        if (this.order.selectAll) {
          return this.cartList
        }
        let list = []
        this.order.selected.forEach((item, index) => {
          if (!item.selectShop) {
            list.push({
              GrabAttrs: []
            })
            item.shopping.forEach(shopping => {
              list[list.length - 1].Title = this.cartList[index].Title
              list[list.length - 1].GrabAttrs
                .push(this.cartList[index].GrabAttrs.find(cartShopping => cartShopping.Id === shopping))
            })
          } else {
            list[list.length - 1].GrabAttrs = this.cartList[index].GrabAttrs
          }
        })
        return list
      }
    },
    methods: {
      afterRatePrice (websiteId, OriginalPrice) {
        const rate = this.rates.find(item => item.WebSiteId === websiteId) || 1
        return parseFloat(OriginalPrice * rate.Rate).toFixed(2)
      }
    }
  }
</script>
