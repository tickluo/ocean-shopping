<template>
  <div class="shopping_list_block" v-if="show">
    <div class="shopping_real_con cart_real_con">
      <c-checkbox :selected="toggle" :disable="outOfTime" @click="changeToggle">
      </c-checkbox>
      <div class="shopping_cart_list_img"><img :src="item.Cover" alt=""></div>
      <div class="shopping_text_con cart_brand_text_con">
        <h3 class="shopping_tit">{{item.Name}} </h3>
        <div class="font-weight_6">RMB {{afterRatePrice}}&nbsp;x&nbsp;{{item.Quantity}}</div>
        <p class="brand_attr"> {{item.Sku}} </p>
      </div>
    </div>
    <div class="cart_unpay_tip dis_flex" v-if="outOfTime">
      <span class="flex_width"> 超过6小时未结算，请重新加入</span>
      <div v-if="!adding" class="small_pink_btn" @click="reAdd">重新加入</div>
      <div v-if="adding" class="readd_cart_loading"><img :src="Images.cartReaddLoading"></div>
    </div>
    <ul class="cart_opera_list">
      <li><a v-link="{name:'modifyDetail',params:{Id:item.Id,shopId:shop_id}}">修改代购单</a></li>
      <li><a :href="item.Url">直达官网</a></li>
      <li><a @click.prevent="removeFromCart">删除商品</a></li>
    </ul>
  </div>
</template>

<script>
  import Images from '../../asset/images'
  import { CCheckbox } from '../../components'
  import { cart, app } from '../../store/action'
  import { toFloatFixed } from '../../services/util.svc'

  export default{
    props: ['item', 'shop_id', 'rate'],
    data () {
      return {
        Images,
        adding: false
      }
    },
    vuex: {
      getters: {
        order: state => state.cart.order,
        removeList: state => state.cart.removeList,
        noCountList: state => state.cart.noCountList,
        currency: state => state.app.appPersist.Currency
      },
      actions: {
        showAlert: app.showAlert,
        selectShopping: cart.selectShopping,
        removeShopping: cart.removeShopping,
        removeFromNoCount: cart.removeFromNoCount,
        addToNoCount: cart.addToNoCoun,
        showConfirm: app.showConfirm,
        setSubmitLoading: app.setSubmitLoading
      }
    },
    computed: {
      toggle () {
        return this.order.selected ? this.order.selected[this.shop_id].shopping.includes(this.item.Id) : true
      },
      outOfTime () {
        return this.noCountList.includes(this.item.Id)
      },
      show () {
        return !this.removeList.includes(this.item.Id)
      },
      serviceRate () {
        return this.currency.ServiceCoefficient || 0
      },
      afterRatePrice () {
        return toFloatFixed(
          toFloatFixed(
            parseFloat(this.item.OriginalPrice * this.rate), 2) * (1 + this.serviceRate), 2)
      }
    },
    components: {
      CCheckbox
    },
    methods: {
      changeToggle () {
        if (this.outOfTime) return;
        this.selectShopping(!this.toggle, this.shop_id, this.item.Id, this.serviceRate)
      },
      reAdd () {
        this.adding = true
        cart.getShopping(this.item.Url)
          .then(res => {
            if (res.Success) {
              let quantity = res.Data.Quantity
              if (this.item.SkuId !== "" && res.Data.Skus && res.Data.Skus.length > 0) {
                let skuShopping = res.Data.Skus.find(item => item.SkuId === this.item.SkuId)
                if (skuShopping) quantity = skuShopping.Quantity
              }
              if (quantity <= 0)  return Promise.reject("该商品无货了，无法重新添加")
              let reAddShopping = Object.assign({}, this.item)
              reAddShopping.Quantity = quantity > reAddShopping.Quantity ? reAddShopping.Quantity : quantity
              reAddShopping.Id = 0
              return cart.addToCart(reAddShopping)
            }
          })
          .then(res => {
            if (res.Success) {
              this.adding = false
              this.removeFromNoCount(this.item.Id)
              this.selectShopping(true, this.shop_id, this.item.Id, this.serviceRate)
              this.showAlert('商品已重新添加')
            }
          })
          .catch(err => {
            this.adding = false
            this.showAlert(err)
          })
      },
      removeFromCart () {
        this.showConfirm({
          tip: '是否删除该商品',
          button: '删除',
          success: '商品已删除',
          fail: '商品删除失败',
          handle: () => {
            this.setSubmitLoading(true, '正在删除商品...')
            return this.removeShopping(this.item.Id)
              .then(res => {
                this.addToNoCount(this.item.Id)
                this.setSubmitLoading(false)
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
