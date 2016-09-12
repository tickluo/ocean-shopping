<template>
  <div class="shopping_list_block">
    <div class="shopping_real_con cart_real_con">
      <c-checkbox :selected="toggle" @click="changeToggle">
      </c-checkbox>
      <div class="shopping_cart_list_img"><img :src="item.Cover" alt=""></div>
      <div class="shopping_text_con cart_brand_text_con">
        <h3 class="shopping_tit">{{item.Name}} </h3>
        <div class="font-weight_6">RMB {{item.Price}}</div>
        <p class="brand_attr"> {{item.Sku}} </p>
      </div>
    </div>
    <ul class="cart_opera_list">
      <li><a href="#">修改代购单</a></li>
      <li><a :href="item.Url">直达官网</a></li>
      <li><a href="#">删除商品</a></li>
    </ul>
  </div>
</template>

<script>
  import { CCheckbox } from '../../components'
  import { cart } from '../../store/action'

  export default{
    props: ['item', 'shop_id'],
    data () {
      return {}
    },
    vuex: {
      getters: {
        order: state => state.cart.order
      },
      actions: {
        selectShopping: cart.selectShopping
      }
    },
    computed: {
      toggle () {
        return this.order.selected ? this.order.selected[this.shop_id].shopping.includes(this.item.Id) : true
      }
    },
    components: {
      CCheckbox
    },
    methods: {
      changeToggle () {
        this.selectShopping(!this.toggle, this.shop_id, this.item.Id)
      }
    }
  }
</script>
