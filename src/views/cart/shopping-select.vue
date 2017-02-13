<template>
  <div class="bot_ccc">
    <div class="" v-fix-bottom="ss">
      <section class="merch_wrap">
        <div class="img_show"><img :src="display.picture" alt=""></div>
        <div class="">
          <div class="merch_text_con">
            <h3 class="shopping_tit">{{display.skuSelect && display.skuSelect.Title}}</h3>
            <section class="merch_price_wrap">
              <div class="merch_attr_detail">
                <span class="color_p">{{currency.CurrencySign}} {{finalPrice}}</span>&nbsp;&nbsp;
                <span class="got_price">( 到手价约{{currency.CurrencySign}} {{handPrice}}起
                  <img @click="showPriceDescription" class="icon_ask" :src='images.iconAsk'> )
                </span>
              </div>
            </section>
          </div>
        </div>
        <section class="merch_attr_list">
          <div class="mrch_attr_tit">官网实价 {{display.skuSelect && select_currency.CurrencySign}}{{display.skuSelect &&
            display.skuSelect.Price}}
          </div>
          <div class="merch_attr_detail">
            <span class="shop_brand" @click="linkShopSite(shopping.Url)">
             <span class="shop_logo_img">
            <img :src='images[countryFlag]'>
           </span>
            {{shopName}}
          </span>
          </div>
        </section>
        <section class="merch_attr_list" @click="showSelAtrLayer">
          <div class="mrch_attr_tit">选择 规格 数量</div>
          <div class="merch_attr_detail">
            <img class="sel_c_z" :src="images.arrRPink">
          </div>
        </section>
        <ul class="spec_attr_list">
          <li>
            <img :src='images.iconRegular'>
            <p>海外正品</p>
          </li>
          <li>
            <img :src='images.iconDirect'>
            <p>官网直购</p>
          </li>
          <li>
            <img :src='images.iconWory'>
            <p>物流无忧</p>
          </li>
          <li>
            <img :src='images.iconPeople'>
            <p>人工客服</p>
          </li>
        </ul>
      </section>
      <article class="block_wrap">
        <h4>服务提醒</h4>
        <div class="tip_text">
          <p>
            因海外电商的价格及库存实时更新、热销商品存在限购等情况，如出现无货、限购等情况，我们会取消订单并于2个工作日内退款给您。
          </p>
          <p></p>
          <p>
            由于海淘的特殊性，海外官网发货后，不支持无理由退换货（质量问题除外），介意者请慎重购买，不便之处，敬请谅解。
          </p>
        </div>
      </article>

      <article class="block_wrap_ht">
        <h4>一键海淘流程</h4>
        <img :src='images.stepImg'>
      </article>
    </div>

    <footer class="shopping_footer" v-disable-tap>
      <div class="customer_service" @click="getCustom">
        <img :src='images.iconHeadset'>
      </div>
      <div class="icon_shopping_cart_1 l_14" v-link="{name:'cart'}">
        <img class="icon_go_back_cart" :src="images.iconShoppingCard_1_1" alt="">
        <span class="message_num">{{cart_count}}</span>
      </div>
      <div class="into_cart_btn">
        <img class="icon_into_shopping_cart" :src="images.iconShoppingCart_2"/>
        <span class="dis_inline_block" @click="showSelAtrLayer">{{viewModel.openMsg}}</span>
      </div>
    </footer>

    <!--弹出遮罩-->
    <div v-if='maskFlag' @click="hideAtrPrice" class="pop_wrap_mask" v-disable-tap></div>
    <!--修改订购单-->
    <div :class='{"pop_height":selAtrLayer}' class="pop_sel_color_size">
      <section class="pop_header" v-disable-tap>
        <div class="s_merch_img">
          <img :src="display.picture" alt="">
        </div>
        <div class="r_sel_attr">
          <h4>{{currency.CurrencySign}} {{finalPrice}}</h4>
          <div class="has_sel" v-if="shopping.SkuClasses && shopping.SkuClasses.length > 0">
            <div class="yixuan">已选 :</div>
            <div class="seled_attr">
              <span>{{currentDisplayOption}}</span>
            </div>
          </div>
          <!-- <p class="risk_tips">
             风险提示：商品为亚马逊第三方商家销售，请谨慎购买！
           </p>-->
        </div>
      </section>
      <section class="pop_con" v-prevent-swipe>
        <shopping-sku v-for="item in shopping.SkuClasses"
                      :title="item.TypeName"
                      :id="$index"
                      :list="item.SkuProperties"
                      :sku="shopping.Skus"
                      :skuclasses="shopping.SkuClasses">
        </shopping-sku>
        <shopping-cost :price="finalPrice"
                       :currency_sign="currency.CurrencySign"
                       :freight="afterRateFreight"
                       :count="display.count">
        </shopping-cost>
        <div class="promo_code_wrap">
          <div class="web_promo_code">
            <div class="web_code">网站优惠码:</div>
            <div class="code_input_box">
              <input class="no_fill" type="text" v-model="modify_shopping.Coupon" placeholder="如有优惠码请填写"/></div>
          </div>
          <div class="web_promo_code pad_10">
            <div class="web_code">★当优惠码不可使用时,</div>
            <div class="code_input_box">
              <a class="do_order_disable"
                 :class="{'do_order_used':!modify_shopping.IsBuy}"
                 @click="selectIfBuy(false)">取消下单</a>
              <a class="do_order_disable"
                 :class="{'do_order_used':modify_shopping.IsBuy}"
                 @click="selectIfBuy(true)">仍然下单</a></div>
          </div>
          <p class="web_promo_code chajia">优惠码使用成功后，差价将在1个工作日内返还</p>
        </div>
        <!--<div class="fill_other">
          <input class="fill_other_input" v-model="modify_shopping.Note" type="text" placeholder="如用其他要求，请在此填写"/>
        </div>-->
        <div class="web_promo_code">
          <div class="web_code">备注:</div>
          <div class="code_input_box wid_input">
            <input class="fill_other_input" v-model="modify_shopping.Note" type="text" placeholder="如用其他要求，请在此填写"/>
          </div>
        </div>
        <div class="six_provide">
          一键海淘服务由6City提供
        </div>
      </section>
      <section class="pop_fot" v-disable-tap @click="addToCart()">
        <div class="wid_btn no_radius">{{viewModel.buttonMsg}}</div>
      </section>
    </div>
    <!--海淘到手价说明-->
    <section :class='{"price_description_in":priceDescription}' class="price_description" v-disable-tap>
      <div class="description_tit">海淘商品到手价说明
        <span class="icon_x">
            <img @click="hideAtrPrice" :src='images.iconX'>
          </span>
      </div>
      <ul class="description_list">
        <li>
          <h4>
            <label>商品价格</label>
            <span>{{currency.CurrencySign}} {{finalPrice}}</span>
          </h4>
          <p>规格不同可能售价不同{{serviceFeeDes}}</p>
          <p class="color_p">{{select_currency.RateDescription}}</p>
        </li>
        <li>
          <h4>
            <label>商家运费</label>
            <span>{{currency.CurrencySign}} {{afterRateFreight}}</span>
          </h4>
          <p>电商网站发到转运公司的当地运费。</p>
        </li>
        <li>
          <h4>
            <label>海淘国际运费</label>
            <span>预计{{currency.CurrencySign}}{{shippingFee}}或以上</span>
          </h4>
          <p class="color_p">待商品在转运公司入库，由转运公司称重后前来支付。</p>
        </li>
        <li>
          <h4>
            <label>预计到手价</label>
            <span>{{currency.CurrencySign}}{{handPrice}}起</span>
          </h4>
          <p>不含税费，商品税费在清关时根据海关产生，除电子商品外多数商品可选择包税渠道转运。</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  import { ShoppingCost, ShoppingSku } from '../../components'
  import { CountryNumber, WayType } from '../../local/config.enum'
  import config from '../../../config/_base.config'
  import Faq from '../layout/faq.vue'
  import { cart, app } from '../../store/action'
  import { getDisableSku } from '../../services/sku.svc'
  import { rangeAlgo, mathAlgo } from '../../services/ship.svc'
  import { toFloatFixed, parseDomain, getCurrency } from '../../services/util.svc'
  import images from '../../asset/images'
  import logos from '../../asset/web_logo'

  export default{
    props: ['shopping', 'cart_count', 'select_currency', 'modify_shopping', 'type', 'shipping_default'],
    data () {
      return {
        selAtrLayer: false,
        priceDescription: false,
        maskFlag: false,
        images,
        logos
      }
    },
    components: {
      ShoppingSku,
      ShoppingCost,
      Faq
    },
    vuex: {
      getters: {
        display: state => state.cart.display,
        skuSelect: state => state.cart.display.skuSelect,
        currency: state => state.app.appPersist.Currency
      },
      actions: {
        showAlert: app.showAlert,
        setSubmitLoading: app.setSubmitLoading
      }
    },
    computed: {
      isModify () {
        return this.type === 'modify'
      },
      countryFlag () {
        return CountryNumber[this.select_currency.CountryId]
      },
      shopName () {
        return this.select_currency.Url ? this.select_currency.Url.split('.')[0] : '去官网'
      },
      viewModel () {
        return this.isModify ?
        {
          openMsg: '去修改',
          buttonMsg: '保存修改',
          submitMsg: '正在修改...',
          cbMsg: '修改成功'
        } :
        {
          openMsg: '一键海淘',
          buttonMsg: '加入购物车',
          submitMsg: '正在添加...',
          cbMsg: '添加成功'
        }
      },
      currentDisplayOption () {
        let skuDes = ''
        this.shopping.SkuClasses.forEach(item => {
          if (item.SkuProperties.length < 1) return
          skuDes += item.SkuProperties.find(sku => this.skuSelect.PropIds.includes(sku.PropId)).PropertieName + ' '
        })
        return skuDes
      },
      ServiceCoefficient () {
        return (this.currency && this.currency.ServiceCoefficient) || 0
      },
      serviceFeeDes () {
        return this.ServiceCoefficient > 0 ? `，含代买服务费${this.currency.CurrencySign}
          ${toFloatFixed(this.afterRatePrice * (this.ServiceCoefficient), 2)}`
          : ''
      },
      shippingFee () {
        let shippingWay = this.shipping_default.ShippingCompany.ShippingWayDefault
        if (shippingWay.WayType === WayType.Range) {
          return rangeAlgo(this.shopping.Weight, shippingWay.Service, shippingWay.Rate)
        }
        if (shippingWay.WayType === WayType.Math) {
          return mathAlgo(
            this.shopping.Weight,
            shippingWay.FirstWeight,
            shippingWay.FirstWeightPrice,
            shippingWay.ContinuedWeight,
            shippingWay.ContinuedWeightPrice
          )
        }
      },
      shopLogo () {
        const logo = this.select_currency.Logo
        if (!logo || logo === '') return ''
        let logoArr = logo.split('/')
        return logoArr[logoArr.length - 1]
      },
      afterRatePrice () {
        return this.select_currency
          && this.genRate(this.display.skuSelect.Price)
      },
      finalPrice () {
        return toFloatFixed((this.afterRatePrice * (1 + this.ServiceCoefficient)), 2)
      },
      handPrice () {
        return toFloatFixed((this.finalPrice * 1 + this.afterRateFreight * 1 + this.shippingFee * 1), 2)
      },
      afterRateFreight () {
        return this.display.skuSelect && (this.genRate(this.display.skuSelect.Freight) || this.genRate(this.shopping.Freight))
      },
      Currency () {
        return getCurrency(this.currency.CurrencyCode)
      }
    },
    methods: {
      getCustom () {
        window.location.href = config.custom_service_url
      },
      linkShopSite (site) {
        window.location.href = site
      },
      showSelAtrLayer(){
        this.maskFlag = true
        this.selAtrLayer = true
      },
      showPriceDescription(){
        this.maskFlag = true
        this.priceDescription = true
      },
      hideAtrPrice(){
        this.selAtrLayer = false
        this.priceDescription = false
        setTimeout(() => {
          this.maskFlag = false
        }, 200);
      },
      genRate (price) {
        return toFloatFixed(this.select_currency.Rate * price, 2)
      },
      selectIfBuy (isBuy) {
        this.modify_shopping.IsBuy = isBuy
      },
      genCartInfo () {
        let skuMsg = ''
        this.shopping.SkuClasses && this.shopping.SkuClasses.length > 0 && this.shopping.SkuClasses.forEach((option, index) => {
          if (option.SkuProperties.length < 1) return
          let skuRowId = this.display.skuSelect.PropIds.findIndex(item => item[0] === `${index}`)
          skuMsg += `${option.TypeName}:${option.SkuProperties
            .find(item => item.PropId === this.display.skuSelect.PropIds[skuRowId]).PropertieName},`
        })
        return {
          Id: this.modify_shopping.Id,
          Cover: this.display.picture,
          CountryId: this.select_currency.CountryId,
          ExpressFee: this.display.skuSelect.Freight || this.shopping.Freight,
          Height: this.shopping.Height || 0,
          Length: this.shopping.Length || 0,
          Name: this.display.skuSelect.Title,
          Note: this.modify_shopping.Note,
          OriginalCurrencyCode: this.select_currency.CurrencyCode,
          OriginalCurrencySign: this.select_currency.CurrencySign,
          OriginalPrice: this.display.skuSelect.Price,
          Pictures: this.display.picture,
          Quantity: this.display.count,
          Sku: skuMsg.toString().slice(0, -1),
          SkuId: this.display.skuSelect.SkuId,
          StoreLogo: this.display.skuSelect.Shop.Logo,
          StoreName: this.select_currency.WebSiteName,
          StoreUrl: this.display.skuSelect.Shop.Url,
          UnitPrice: this.display.skuSelect.ListPrice,
          Url: this.display.skuSelect.Url,
          WebSiteId: this.select_currency.WebSiteId,
          CId: this.shopping.CId || '',
          OriginalUrl: this.shopping.OriginalUrl || '',
          RebateUrl: this.shopping.RebateUrl || '',
          Weight: this.shopping.Weight || 0,
          Width: this.shopping.Width || 0,
          IsBuy: this.modify_shopping.IsBuy,
          Coupon: this.modify_shopping.Coupon
        }
      },
      addToCart () {
        this.setSubmitLoading(true, this.viewModel.submitMsg)
        return cart.addToCart(this.genCartInfo())
          .then(res => {
            this.setSubmitLoading(false)
            if (res.Success) {
              this.showAlert(this.viewModel.cbMsg)
              this.$router.go({ name: 'cart' })
            }
          })
      }
    }
  }
</script>
