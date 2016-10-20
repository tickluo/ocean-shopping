<template>
  <div class="shopping_list_block" v-if="show">
    <div class="shopping_real_con cart_real_con">
      <c-checkbox :selected="toggle" @click="changeToggle">
      </c-checkbox>
      <div class="shopping_cart_list_img"><img :src="item.Cover" alt=""></div>
      <div class="shopping_text_con cart_brand_text_con">
        <h3 class="shopping_tit">{{item.Name}} </h3>
        <div class="font-weight_6">RMB {{afterRatePrice}}&nbsp;x&nbsp;{{item.Quantity}}</div>
        <p class="brand_attr"> {{item.Sku}} </p>
      </div>
    </div>
    <ul class="cart_opera_list">
      <li><a v-link="{name:'detail',params:{Id:item.Id,shopId:shop_id}}">修改代购单</a></li>
      <li><a :href="item.Url">直达官网</a></li>
      <li><a @click.prevent="removeFromCart">删除商品</a></li>
    </ul>
  </div>
</template>

<script>
  import { CCheckbox } from '../../components'
  import { cart, app } from '../../store/action'
  import { toFloatFixed } from '../../services/util.svc'

  export default{
    props: ['item', 'shop_id', 'rate'],
    data () {
      return {}
    },
    vuex: {
      getters: {
        order: state => state.cart.order,
        removeList: state => state.cart.removeList,
        currency: state => state.app.Currency
      },
      actions: {
        selectShopping: cart.selectShopping,
        removeShopping: cart.removeShopping,
        showConfirm: app.showConfirm,
        setSubmitLoading: app.setSubmitLoading
      }
    },
    computed: {
      toggle () {
        return this.order.selected ? this.order.selected[this.shop_id].shopping.includes(this.item.Id) : true
      },
      show () {
        return !this.removeList.includes(this.item.Id)
      },
      serviceRate (){
        return this.currency.ServiceCoefficient || 0
      },
      afterRatePrice () {
        return toFloatFixed(
          toFloatFixed(
            parseFloat(this.item.OriginalPrice * this.rate),
            2
          ) * (1 + this.serviceRate),
          2
        )
      }
    },
    components: {
      CCheckbox
    },
    methods: {
      changeToggle () {
        this.selectShopping(!this.toggle, this.shop_id, this.item.Id, this.serviceRate)
      },
      removeFromCart () {
        this.showConfirm({
          tip: '是否删除该商品',
          button: '删除',
          success: '商品已删除',
          fail: '商品删除失败',
          handle: () => {
            this.setSubmitLoading(true, '正在删除商品...')
            return this.removeShopping(this.$route.params.key, this.item.Id)
              .then(res => {
                if (res.Success && this.toggle) {
                  this.selectShopping(false, this.shop_id, this.item.Id, this.serviceRate)
                }
                return Promise.resolve(res)
              })
          }
        })
      }
    }
  }
</script>
