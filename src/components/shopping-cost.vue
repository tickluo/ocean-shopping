<template>
  <div>
    <section class="merch_attr_wrap">
      <div class="mrch_attr_tit">商品单价:</div>
      <div class="merch_attr_detail">{{currency_sign}} {{price}}</div>
    </section>
    <section class="merch_attr_wrap">
      <div class="mrch_attr_tit">商家运费:</div>
      <div class="merch_attr_detail">{{currency_sign}} {{freight}}</div>
    </section>
    <section class="merch_attr_wrap opear_num">
      <div class="mrch_attr_tit">商品数量:</div>
      <div class="merch_attr_detail"><span class="button_reduce" @click="reduceCount"></span> <span class="real_num">
                <input type="text" :value="defaultCount"/>
            </span> <span class="button_add" @click="addCount"></span></div>
    </section>
  </div>
</template>

<script>
  import { cart } from '../store/action'
  export default{
    props: ['price', 'currency_sign', 'freight', 'count'],
    data(){
      return {
        defaultCount: this.count || 1
      }
    },
    vuex: {
      getters: {},
      actions: {
        addShoppingCount: cart.addShoppingCount,
        reduceShoppingCount: cart.reduceShoppingCount
      }
    },
    methods: {
      addCount () {
        this.defaultCount++
        this.addShoppingCount()
      },
      reduceCount () {
        this.defaultCount === 1 || ( this.defaultCount-- && this.reduceShoppingCount())
      }
    }
  }
</script>
