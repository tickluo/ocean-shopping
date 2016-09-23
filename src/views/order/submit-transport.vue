<template>
  <div>
    <div class="mar_bot_29">
      <article class="about_address_wrap">
        <section class="change_address">
          <div class="user_address_name" v-if="!hasAddress" v-link="{name:'addAddress'}">
            <a href="#" class="wid_btn">
              <img :src="images.iconLocation" alt="" class="icon_location">
              <span class="dis_inline_block">填写收货地址(必填)</span></a>
          </div>
          <div class="user_address_name" v-if="hasAddress" v-link="{name:'selectAddress'}">
            <div class="font_size_30">
              <span class="font-weight_6">{{defaultAddress.RecipientName}}，{{defaultAddress.PhoneNumber}}</span>
            </div>
            <p> {{defaultAddress.StreetAddress1}}{{defaultAddress.StreetAddress2}}{{defaultAddress.StreetAddress3}} </p>
            <a href="#" class="to_change_address">更换收货地址 ></a>
          </div>
        </section>

        <section class="fill_other">
          <input class="fill_other_input" type="text" placeholder="如用其他要求，请在此填写"></section>
        <section class="shentong">
          <div class="need_times">
            <span class="flex_width font_size_30">由<strong>&nbsp;申通快递&nbsp;</strong>负责转运</span>
            <span class="text_align_r">12-18天</span>
          </div>
          <div class="triangle_left">
            选择转运路线
          </div>
        </section>
        <div class="way_for_transport" v-for="ship in shipWay">
          <div class="icon_circle_stroke icon_circle_fill">
            <input type="radio" name="zhuanyun" value="">
          </div>
          <div class="way_for_transport_item">
            {{ship.Name}}
          </div>
          <div class="font-weight_6 font_size_30">
            RMB 12347.66
          </div>
        </div>

        <section class="shentong">
          <div class="triangle_left">
            转运公司增值服务
          </div>
        </section>

        <div class="way_for_transport">
          <div class="icon_circle_stroke">
            <input type="radio" name="zengzhi" value="">
          </div>
          <div class="way_for_transport_item">
            多包裹合箱<span class="small_pink_btn">您有两个包裹</span>
          </div>
          <div class="font-weight_6 font_size_30 color_gray_9">
            RMB 0.00
          </div>
        </div>

        <div class="way_for_transport">
          <div class="icon_circle_stroke">
            <input type="radio" name="zengzhi" value="">
          </div>
          <div class="way_for_transport_item">
            普通加固
          </div>
          <div class="font-weight_6 font_size_30 color_gray_9">
            RMB 0.00
          </div>
        </div>
        <div class="way_for_transport">
          <div class="icon_circle_stroke icon_circle_fill">
            <input type="radio" name="zengzhi" value="">
          </div>
          <div class="way_for_transport_item">
            高级加固
          </div>
          <div class="font-weight_6 font_size_30">
            RMB 0.00
          </div>
          <div class="advance_tips">
            按3元500g收费，客服会联系您补款。对易损易碎特殊物品（如奶粉、液体、电子产品及其他）用加厚气泡胶带加固
          </div>
        </div>
      </article>

      <article class="order_wrap">
        <h4 class="order_number  ">
          <div class="real_number">
            包裹: <span class="font-weight_6">6714659566467146595664</span>
          </div>
          <strong class="text_align_r">1200g</strong>
        </h4>
        <section class="order_list">
          <div class="order_list_con">
            <div class="merch_main_img"><img :src="images.noimg" alt=""></div>
            <div class="right_merch_text">
              <h3 class="shopping_tit">Demi Bra - Dream Angels - Victoria's Domu-ko Secret
              </h3>
              <div class="font-weight_6">RMB 296.50x1</div>
              <p class="brand_attr"> Coconut White Boheme Lace Coconut White Boheme Lace </p>
            </div>
          </div>
        </section>
      </article>
      <article class="order_wrap">
        <h4 class="order_number  ">
          <div class="real_number">
            包裹:<span class="font-weight_6"> 671465956645664</span>
          </div>
          <strong class="text_align_r">
            2400g
          </strong>
        </h4>
        <section class="order_list">
          <div class="order_list_con">
            <div class="merch_main_img"><img :src="images.merchImg1" alt=""></div>
            <div class="right_merch_text">
              <h3 class="shopping_tit">Demi Bra - Dream Angels - Victoria's Secret
              </h3>
              <div class="font-weight_6">RMB 296.50x1</div>
              <p class="brand_attr"> Coconut White Boheme Lace </p>
            </div>
          </div>
        </section>
        <section class="order_list">
          <div class="order_list_con">
            <div class="merch_main_img"><img :src="images.dealCardShopping_2x" alt=""></div>
            <div class="right_merch_text">
              <h3 class="shopping_tit">Demi Bra - Dream Angels - Victoria's Domu-ko Secret Ha This-is Just A Title For
                test
              </h3>
              <div class="font-weight_6">RMB 296.50x1</div>
              <p class="brand_attr"> Coconut White Boheme Lace </p>
            </div>
          </div>
        </section>
      </article>
    </div>

    <section class="pay_way_wrap">
      <div class="pay_way_box">
        <img class="icon_alipay_wecheat" :src="images.iconAlipay" alt="">
        <div class="alipay">
          支付宝
        </div>
        <div class="font-weight_6">
          RMB 12347.66
        </div>
      </div>

      <div class="pay_way_box bg_f8">
        <div class="alipay">
          转运重量
        </div>
        <div class="font-weight_6">
          1200g
        </div>
      </div>
    </section>

    <footer class="shopping_footer">
      <div class="icon_shopping_cart_1"><img class="icon_go_back_cart icon_back" :src="images.iconGoback" alt="">
        <span class="goback_cart">返回</span></div>
      <div class="into_cart_btn"><img class="icon_into_shopping_cart" :src="images.iconOk"/> <span
        class="dis_inline_block">支付运单</span></div>
    </footer>
  </div>
</template>

<script>
  import images from '../../asset/images'
  import { orders, user } from '../../store/action'

  export default{
    data(){
      return {
        images,
        shipWay: []
      }
    },
    vuex: {
      getters: {
        defaultAddress: state => state.user.defaultAddress,
        order: state => state.orders.shipOrder
      },
      actions: {
        setDefaultAddress: user.getDefaultAddress,
        getPackageByIds: orders.getPackageByIds,
        getShipWay: orders.getShipWay,
        getShipService: orders.getShipService
      }
    },
    components: {},
    computed: {
      hasAddress () {
        return this.defaultAddress && this.defaultAddress.Id > 0
      }
    },
    route: {
      data ({ to: { params: { id, key } } }) {
        return Promise
          .all([
            this.getPackageByIds(key, this.order.PackageIds),
            this.getShipWay(key, id),
            this.getShipService(key, id)
          ])
          .then(res => {

          })
      },
      waitForData: true
    }
  }
</script>
