<template>
  <section class="post_company_wrap">
    <div class="express_post">
      <div class="icon_circle_stroke"
           v-if="!isDefault"
           :class="{'icon_circle_fill':isSelected}"
           @click="selectCompany">
        <input type="radio" name="onof_company" value="shipWay.ShippingCompanyId">
      </div>
      <div class="shopping_cart_list_img"><img :src="shipCompany.Logo" alt=""></div>
      <div class="shopping_text_con" v-if="shipWay.WayType === 2">
        <p>{{shipCompany.Name}}</p>
        <p class="font_28"><span class="font-weight_6">RMB</span>
          {{shipWay.FirstWeightPrice}}/首{{shipWay.FirstWeight}}克
        </p>
        <p class="font_28"><span class="font-weight_6">RMB</span>
          {{shipWay.ContinuedWeightPrice}}/续{{shipWay.ContinuedWeight}}克
        </p>
      </div>
      <div class="shopping_text_con" v-if="shipWay.WayType === 4">
        <p>{{shipCompany.Name}}</p>
        <p class="font_28"><span class="font-weight_6">RMB</span>
          {{shipWay.Price}}/首{{shipWay.Weight}}克
        </p>
      </div>
    </div>
    <div class="default_server_wrap server_wrap">
      <p class="the_post_introduce"> {{shipCompany.ShortDescription}} </p>
      <a class="to_shop_detail" v-if="!ifShowDetail" @click="showDetail">查看服务详情</a>
      <div class="post_special" v-if="ifShowDetail">
        {{{shipCompany.HtmlFiveDescription}}}
      </div>
      <a class="toggle_hide" v-if="ifShowDetail" @click="hideDetail">收起</a></div>
  </section>
</template>

<script>
  import { WayType } from '../../local/config.enum'

  export default{
    props: ['shipWay', 'shipCompany', 'isDefault', 'isSelected'],
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
        this.$dispatch('selectCompany', this.shipWay.ShippingCompanyId)
        this.isSelected = true
      }
    }
  }
</script>
