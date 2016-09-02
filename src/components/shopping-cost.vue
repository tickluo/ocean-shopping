<template>
  <div>
    <section class="merch_attr_wrap">
      <div class="mrch_attr_tit">商品单价</div>
      <div class="merch_attr_detail">RMB 286.50</div>
    </section>
    <section class="merch_attr_wrap">
      <div class="mrch_attr_tit">商家运费</div>
      <div class="merch_attr_detail">RMB 0.00</div>
    </section>
    <section class="merch_attr_wrap opear_num">
      <div class="mrch_attr_tit">商品数量</div>
      <div class="merch_attr_detail">
        <span class="button_reduce"></span>
        <span class="real_num">
                <input type="text" value="1"/>
            </span>
        <span class="button_add"></span>
      </div>
    </section>
  </div>
</template>

<script>
  export default{
    data(){
      return {}
    }
  }
</script>
