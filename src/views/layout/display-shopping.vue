<template>
  <div class="order_list_con">
    <div class="merch_main_img"><img :src="cover" alt=""></div>
    <div class="right_merch_text">
      <h3 class="shopping_tit">{{name}}</h3>
      <div class="font-weight_6">RMB {{price}}x{{quantity}}</div>
      <p class="brand_attr"> {{sku}} </p>
    </div>
  </div>
</template>

<script>
  import noPic from '../../asset/images/noimg.png'
  export default{
    /* props: ['cover', 'name', 'price', 'quantity', 'sku'],*/
    props: {
      cover: {
        default: noPic
      },
      name: {
        required: true
      },
      price: {
        required: true
      },
      quantity: {
        required: true
      },
      sku: {
        required: true
      }
    }
  }
</script>
