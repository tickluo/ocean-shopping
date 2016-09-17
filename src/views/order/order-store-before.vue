<template>
  <div>
    <article class="order_wrap">
      <h4 class="order_number">
        <div class="real_number">
          包裹: <span class="font-weight_6">6714659566467146595664</span>
        </div>
        <span class="text_align_r">申通美国</span>
      </h4>
      <section class="order_list">
        <display-shopping v-for="shopping in order.GrabAttrs"
                          :cover="shopping.Cover"
                          :name="shopping.Name"
                          :price="shopping.OriginalPrice"
                          :quantity="shopping.Quantity"
                          :sku="shopping.Sku"
                          :coupon="shopping.Coupon"
                          :is_buy="shopping.IsBuy">
        </display-shopping>
      </section>
      <div class="link_transport">
        官网已发货，<a href="#">查看物流</a>
      </div>
    </article>
  </div>
</template>

<script>
  import displayShopping from '../layout/display-shopping.vue'

  export default{
    data(){
      return {}
    },
    components: {
      displayShopping
    }
  }
</script>
