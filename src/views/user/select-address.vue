<template>
  <div>
    <section class="change_address">
      <div class="user_address_name">
        <a class="wid_btn" v-link="{name:'addAddress'}">
          <img :src="images.iconAdd" alt="" class="icon_location">
          <span class="dis_inline_block">添加收货地址</span></a>
      </div>
    </section>
    <article class="user_addresses_wrap">
      <section class="user_address_box chosed_address">
                <span class="icon_circle_stroke icon_circle_fill">
                    <input type="radio" name="choice_address">
                </span>
        <span class="user_address_con">
                    <h4><span class="font_size_30 dis_inline_block">很长很长很长的名字， 18612345678</span><span
                      class="circle_rect">默认地址</span></h4>
                    <div class="mar_top_5">上海 上海市 普陀区</div>
                    <div class="mar_top_5">杨新村街道曹杨路867号联纵智达大厦5楼，6City全球购美国事业部</div>
                    <div class="mar_top_5">
                        身份证已上传(3101************5678)
                    </div>
                </span>
      </section>
      <ul class="cart_opera_list">
        <li><a href="#">修改地址</a></li>
        <li><a href="#">删除地址</a></li>
      </ul>
    </article>
    <footer class="shopping_footer">
      <div class="icon_shopping_cart_1" v-link="{name:'submitShopping'}">
        <img class="icon_go_back_cart icon_back" :src="images.iconGoback" alt="">
        <span class="goback_cart">上一步</span></div>
      <div class="into_cart_btn"><img class="icon_into_shopping_cart" :src="images.iconOk"/> <span
        class="dis_inline_block">选择该收货地址</span></div>
    </footer>
  </div>
</template>

<script>
  import images from '../../asset/images'

  export default{
    data(){
      return {
        images
      }
    },
    components: {}
  }
</script>
