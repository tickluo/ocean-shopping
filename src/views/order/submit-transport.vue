<template xmlns:v-validate="http://www.w3.org/1999/xhtml">
  <div>
    <v-loading v-if="$loadingRouteData"></v-loading>
    <div v-if="!$loadingRouteData" class="mar_bot_29" v-fix-bottom>
      <article class="about_address_wrap">
        <section class="change_address">
          <div class="user_address_name" v-if="!hasAddress" v-link="{name:'addAddress'}">
            <a class="wid_btn">
              <img :src="images.iconLocation" alt="" class="icon_location">
              <span class="dis_inline_block">填写收货地址(必填)</span></a>
          </div>
          <div class="user_address_name" v-if="hasAddress">
            <div class="font_size_30">
              <span class="font-weight_6">{{defaultAddress.RecipientName}}，{{defaultAddress.PhoneNumber}}</span>
            </div>
            <p> {{defaultAddress.StreetAddress1}}{{defaultAddress.StreetAddress2}}{{defaultAddress.StreetAddress3}} </p>
            <a v-link="{name:'selectAddress'}" class="to_change_address">更换收货地址 ></a>
          </div>
        </section>
        <section class="fill_other">
          <input class="fill_other_input" v-model="note" type="text" placeholder="如有其他要求，请在此填写"></section>
        <section class="shentong">
          <div class="need_times">
            <span class="flex_width font_size_30">转运公司：<strong>&nbsp;{{shipInfo.shipName}}&nbsp;</strong></span>
            <!--<span class="text_align_r">{{wayDes}}</span>-->
          </div>
          <!--<div class="triangle_left">
            选择转运路线
          </div>-->
        </section>
        <div class="way_for_transport" v-for="way in shipWay">
          <div class="icon_circle_stroke"
               :class="{'icon_circle_fill':selectShipWayId === way.Id}"
               @click="selectWay(way.Id,way.ShortDescription)">
            <input type="radio" name="zhuanyun" value="">
          </div>
          <div class="way_for_transport_item">
            {{way.Name}}
          </div>
          <div class="way_for_transport_item font-weight_6 font_size_30">
            RMB {{genMath(way.Id)}}
          </div>
          <div class="way_for_transport_item text_align_r font_size_25">{{wayDes}}</div>
        </div>
        <!--<section class="shentong">
          <div class="triangle_left">
            转运公司增值服务
          </div>
        </section>-->
        <!--申报总价-->
        <validator name="declareMoneyValidation">
          <div v-if="!selectShipWay.IncludeTax">
            <section class="shentong">
              <!--申报总价-->
              <div class="flex_width">
                <div class="sbzj">申报总价（必填）</div>
                <a v-link="{name:'cart'}" class="sz_detail">
                  详细说明 >
                </a>
              </div>
            </section>
            <section class="way_for_transport pad_20">
              <div class="way_for_transport_item font_size_25 c_666">
                按照您填写的金额进行申报
              </div>
              <div class="money_type">
                <span class="inner_abs">{{declareCurrency}}</span>
                <input class="inp_szprice"
                       :class="{'err_input':
                     $declareMoneyValidation.money &&
                     $declareMoneyValidation.money.modified &&
                     $declareMoneyValidation.money.invalid}"
                       v-validate:phone="{
                     required: { rule: true, message: '请填写申报金额' },
                     price:{ rule: true, message: '请填写正确的金额格式' }
                     }"
                       type="text"
                       v-model="declareMoney"/>
              </div>
            </section>
          </div>
        </validator>
        <section class=" shentong">
          <!--转运公司增值服务-->
          <div class="flex_width">
            <div class="sbzj">转运公司增值服务</div>
            <a v-link="{name:'cart'}" class="sz_detail">
              详细说明 >
            </a>
          </div>
        </section>
        <div class="way_for_transport" v-if="hasBox">
          <div class="icon_circle_stroke"
               :class="{'icon_circle_fill':doBox,'icon_circle_disable':packageCount === 1}"
               @click="selectBox">
            <input type="radio" name="zengzhi" value="">
          </div>
          <div class="way_for_transport_item">多包裹合箱
            <span class="small_pink_btn">
            {{packageCount === 1 ? "您没有其他包裹" : "您有" + packageCount + "个包裹"}}
          </span>
          </div>
          <div class="font-weight_6 font_size_30 color_gray_9">
            RMB {{boxPrice}}
          </div>
          <div class="sel_more_package" v-if="doBox" v-link="{name:'mergeStore'}">
            <span class="font_27">选择多包裹合箱</span>
            <img class="text_align_r" :src="images.iconArrR" alt="">
          </div>
        </div>
        <div class="way_for_transport" v-for="service in shipService">
          <div class="icon_circle_stroke"
               :class="{'icon_circle_fill':hasSelect(service.Id)}"
               @click="selectService(service.Id)">
            <input type="radio" name="zengzhi" value="">
          </div>
          <div class="way_for_transport_item">
            {{service.ServiceName}}
          </div>
          <div class="font-weight_6 font_size_30 color_gray_9">
            RMB {{service.Fee}}
          </div>
          <div class="advance_tips" v-if="hasSelect(service.Id)">
            {{service.Description}}
          </div>
        </div>
      </article>
      <article class="order_wrap" v-for="package in packages">
        <h4 class="order_number  ">
          <div class="real_number">
            包裹: <span class="font-weight_6">{{package.PackageNo}}</span>
          </div>
          <strong class="text_align_r">{{package.Weight}}g</strong>
        </h4>
        <display-shopping v-for="shopping in package.GrabAttrs"
                          :cover="shopping.Cover"
                          :name="shopping.Name"
                          :price="shopping.Price"
                          :quantity="shopping.Quantity"
                          :sku="shopping.Sku">
        </display-shopping>
      </article>
    </div>

    <section class="pay_way_wrap" v-disable-tap>
      <div class="pay_way_box">
        <img class="icon_alipay_wecheat" :src="images.iconAlipay" alt="">
        <div class="alipay">
          支付宝
        </div>
        <div class="font-weight_6">
          RMB {{finalPrice}}
        </div>
      </div>

      <div class="pay_way_box bg_f8">
        <div class="alipay">
          转运重量
        </div>
        <div class="font-weight_6">
          {{finalWeight}}g
        </div>
      </div>
    </section>

    <footer class="shopping_footer" v-disable-tap>
      <div class="icon_shopping_cart_1" v-link="{name:'storeOrderAfter'}">
        <img class="icon_go_back_cart icon_back" :src="images.iconGoback" alt="">
        <span class="goback_cart">返回</span></div>
      <div class="into_cart_btn" @click="saveTranOrder">
        <img class="icon_into_shopping_cart" :src="images.iconOk"/>
        <span class="dis_inline_block">支付运单</span></div>
    </footer>
  </div>
</template>

<script>
  import images from '../../asset/images'
  import { orders, user, app } from '../../store/action'
  import displayShopping from '../layout/display-shopping.vue'
  import VLoading from '../../components/v-loading.vue'
  import { WayType, PayType } from '../../local/config.enum'
  import { rangeAlgo, mathAlgo } from '../../services/ship.svc'
  import { toFloatFixed, getCurrency } from '../../services/util.svc'

  const getInitData = () => ({
    images,
    shipInfo: {},
    shipWay: [],
    shipService: [],
    packages: [],
    packageCount: 0,
    wayDes: '',
    declareMoney: '',
    hasBox: true,
    doBox: false,
    note: ''
  })

  export default{
    data(){
      return getInitData()
    },
    vuex: {
      getters: {
        defaultAddress: state => state.user.defaultAddress,
        selectShipWayId: state => state.orders.shipOrder.ShippingWayId,
        selectShipService: state => state.orders.shipOrder.ExtraServiceIds,
        order: state => state.orders.shipOrder,
        defaultPid: state => state.orders.defaultPid,
        box: state=>state.orders.box
      },
      actions: {
        setDefaultAddress: user.getDefaultAddress,
        setShipWay: orders.setShipWay,
        // TODO: change to one setShipService
        addShipService: orders.addShipService,
        removeShipService: orders.removeShipService,
        clearShipService: orders.clearShipService,
        setBox: orders.setBox,
        setPackageIds: orders.setPackageIds,
        setPayOrder: user.setPayOrder,
        genPay: app.genPay,
        showAlert: app.showAlert,
        showConfirm: app.showConfirm,
        setSubmitLoading: app.setSubmitLoading
      }
    },
    components: {
      displayShopping,
      VLoading
    },
    computed: {
      selectShipWay () {
        return this.shipWay.find(item => item.Id === this.selectShipWayId)
      },
      declareCurrency () {
        return getCurrency(this.packages[0].GrabAttrs[0].OriginalCurrencyCode)
      },
      hasAddress () {
        return this.defaultAddress && this.defaultAddress.Id > 0
      },
      boxPrice () {
        return this.doBox ? this.box.Values.find(item => item.Number === this.packages.length).Price : 0
      },
      finalWeight () {
        if (this.selectShipService.length > 0) {
          let tempWeight = this.shipInfo.totalWeight
          this.shipService.filter(item => this.selectShipService.includes(item.Id)).forEach(item => {
            tempWeight += this.shipInfo.totalWeight * item.WeightCoefficients - this.shipInfo.totalWeight
          })
          return tempWeight
        }
        return this.shipInfo.totalWeight
      },
      finalPrice () {
        let services = this.shipService
          .filter(item => this.selectShipService.includes(item.Id)).map(item => item.Fee)
        let servicePrice = 0
        if (services.length === 1)
          servicePrice = services[0]
        if (services.length > 1)
          servicePrice = services.reduce((pre, cur) => pre + cur)
        return toFloatFixed((
          this.genMath(this.selectShipWayId) * 1 +
          this.boxPrice * (this.doBox ? 1 : 0) +
          servicePrice
        ), 2)
      }
    },
    methods: {
      initOrder () {
        this.$data = getInitData()
        this.setPackageIds([])
        this.clearShipService()
      },
      hasSelect (id) {
        return this.selectShipService.includes(id)
      },
      selectBox () {
        if (this.packageCount === 1) return false
        this.doBox = !this.doBox
        if (!this.doBox) {
          this.setPackageIds([])
          this.packages = this.packages.filter(item => item.Id === this.defaultPid)
        }
      },
      selectWay (id, des) {
        this.setShipWay(id)
        this.wayDes = des
      },
      selectService (id) {
        if (this.hasSelect(id)) {
          this.removeShipService(id)
        } else {
          this.addShipService(id)
        }
      },
      genMath (id) {
        let tempShip = this.shipWay.find(item => item.Id === id)
        if (!tempShip) return 0
        if (tempShip.WayType === WayType.Range) {
          return rangeAlgo(this.finalWeight, tempShip.Service, tempShip.Rate)
        }
        if (tempShip.WayType === WayType.Math) {
          return mathAlgo(
            this.finalWeight,
            tempShip.FirstWeight,
            tempShip.FirstWeightPrice,
            tempShip.ContinuedWeight,
            tempShip.ContinuedWeightPrice
          )
        }
        else this.showAlert('没有这种运输算法')
      },
      saveTranOrder () {
        if (!this.defaultAddress && !this.defaultAddress.Id) {
          return this.showAlert('请填写收货地址')
        }
        if (this.$declareMoneyValidation.invalid) {
          this.$declareMoneyValidation.errors.forEach(item => {
            this.$declareMoneyValidation[item.field].modified = true

          })
          return this.showAlert(this.$declareMoneyValidation.errors[0].message)
        }
        let shoppingTotalAmount = 0
        this.packages.forEach(item => {
          item.GrabAttrs.forEach(shopping => {
            shoppingTotalAmount += shopping.OriginalPrice
          })
        })
        if (this.declareMoney <= 0 || this.declareMoney > shoppingTotalAmount) {
          return this.showAlert(`申报价格必须在0至${shoppingTotalAmount}${this.declareCurrency}之间`)
        }
        let submitOrder = Object.assign({}, this.order)
        submitOrder.PackageIds.push(this.defaultPid)
        submitOrder.PaymentType = PayType.AliPay
        submitOrder.ShippingCompanyId = this.box.ShippingCompanyId
        submitOrder.TotalAmount = this.finalPrice
        submitOrder.Score = 0
        submitOrder.Coupon = ''
        submitOrder.AddressId = this.defaultAddress.Id
        submitOrder.DeclaredTotalAmount = this.declareMoney
        submitOrder.Note = this.note
        this.showConfirm({
          tip: '是否支付运单？',
          button: '支付',
          success: '运单已生成',
          fail: '运单生成失败',
          handle: () => {
            this.setSubmitLoading(true, '正在生成运单...')
            return orders.saveTranOrder(submitOrder)
              .then(res => {
                this.setSubmitLoading(false)
                if (res.Success) {
                  this.setPayOrder({
                    paymentNo: res.Data.PaymentNo,
                    totalAmount: res.Data.TotalAmount,
                    returnUrl: `/#!/order/store/after`,
                    backUrl: `/#!/order/store/after`
                  })
                  this.genPay(true)
                }
                return Promise.resolve(res)
              })
          }
        })
      }
    },
    route: {
      data ({ to: { params: { id, type } } }) {
        let ids = []
        if (type === 'new') this.initOrder()
        else ids = Array.from(this.order.PackageIds)
        ids.push(this.defaultPid)
        return orders.getPackageByIds(ids)
          .then(data => {
            let weight = 0
            if (data.Success) {
              let defaultPac = data.List[0]
              weight = data.List.length === 1 ?
                data.List[0].Weight :
                data.List.reduce((pre, cur) => pre.Weight + cur.Weight)
              this.shipInfo = {
                shipName: defaultPac.ShippingCompanyName,
                totalWeight: weight
              }
              this.packages = data.List
            }
            return Promise.all([
              orders.getShipWay(weight, id),
              orders.getShipService(id),
              orders.getPackageCount(id)
            ])
          })
          .then(res => {
            if (res[0].Success) {
              this.shipWay = res[0].List
              this.setShipWay(this.shipWay[0].Id)
              this.wayDes = this.shipWay[0].ShortDescription
            }
            if (res[1].Success) {
              if (!res[1].Data.Box) {
                this.hasBox = false
              }
              this.setBox(res[1].Data.Box)
              this.shipService = res[1].Data.Extra
            }
            if (res[2].Success) {
              this.packageCount = res[2].Data.PackageCount
            }
            if (this.defaultAddress.Id) return {}
            this.setDefaultAddress()
          })
      }
    }
  }
</script>
