<template>
  <section class="post_company_wrap">
    <div class="express_post">
      <div class="icon_circle_stroke"
           v-if="!is_default"
           :class="{'icon_circle_fill':is_selected}"
           @click="selectCompany">
        <input type="radio" name="onof_company" value="ship_Way.ShippingCompanyId">
      </div>
      <div class="shopping_cart_list_img"><img :src="ship_company.Logo" alt=""></div>
      <div class="shopping_text_con">
        <p>{{ship_company.Name}}</p>
        <p class="font_28"><span class="font-weight_6">RMB</span>
          {{ship_Way.FirstWeightPrice}}/首{{ship_Way.FirstWeight}}克
        </p>
        <p class="font_28"><span class="font-weight_6">RMB</span>
          {{ship_Way.ContinuedWeightPrice}}/续{{ship_Way.ContinuedWeight}}克
        </p>
      </div>
    </div>
    <div class="default_server_wrap server_wrap">
      <p class="the_post_introduce"> {{ship_company.ShortDescription}} </p>
      <a class="to_shop_detail" v-if="!ifShowDetail" @click="showDetail">查看服务详情</a>
      <div class="post_special" v-if="ifShowDetail">
        {{{ship_company.Description}}}
      </div>
      <a class="toggle_hide" v-if="ifShowDetail" @click="hideDetail">收起</a></div>
  </section>
</template>

<script>
  export default{
    props: ['ship_Way', 'ship_company', 'is_default', 'is_selected'],
    data(){
      return {
        ifShowDetail: false,
      }
    },
    methods: {
      showDetail () {
        this.ifShowDetail = true
      },
      hideDetail () {
        this.ifShowDetail = false
      },
      selectCompany () {
        this.$dispatch('selectCompany', this.ship_Way.ShippingCompanyId)
        this.is_selected = true
      }
    }
  }
</script>
