<template xmlns:v-validate="http://www.w3.org/1999/xhtml">
  <div class="bg_fff">
    <section class="process_wrap">
      <ul class="procsee_list">
        <li>支付<br/>订单费用</li>
        <li></li>
        <li>商品送至<br/>转运仓库</li>
        <li></li>
        <li>支付<br/>国际运费</li>
        <li></li>
        <li>包裹送达<br/>收货地址</li>
      </ul>
      <ul class="procesee_txt_list">
        <li><span class="dot_fill"></span><span class="txt_con">
                       订单费用=商品价格+商家运费
                   </span></li>
        <li><span class="dot_fill"></span><span class="txt_con">
                       收货地址在支付国际运费时填写
                   </span></li>
        <li><span class="dot_fill"></span><span class="txt_con">
                       如产生关税，会通知您缴纳，详询客服
                   </span></li>
      </ul>
    </section>

    <form class="budget_shipment">
      <ul class="country_list">
        <li :class="{'chose_country':isSelected(country.Id)}"
            v-for="country in countries"
            @click.prevent="selectCountry(country.Id)">{{country.Name}}
        </li>
      </ul>
      <div class="fill_weight">
        <validator name="weightValidation">
          <input type="text"
                 class="fill_weight_input"
                 :class="{'err_input':$weightValidation.weight &&
                     $weightValidation.weight.modified &&
                     $weightValidation.weight.invalid}"
                 v-validate:weight="{
                     required: { rule: true, message: '请填写商品重量' },
                     numeric: { rule: true, message: '请填写数字'}
                     }"
                 v-model="freightWeight"
                 placeholder="填写商品重量">
        </validator>
        <div class="sel_unit">
          <label for="ke" class="ke">
            <span class="icon_circle_stroke"
                  :class="{'icon_circle_fill':gUnit}"
                  @click="gUnit = true"></span>
            <input type="radio" id="ke" name="wegit_name"><span class="dis_inline_block">克</span>
          </label>
          <label for="bang">
            <span class="icon_circle_stroke"
                  :class="{'icon_circle_fill':!gUnit}"
                  @click="gUnit = false"></span>
            <input type="radio" id="bang" name="wegit_name"><span class="dis_inline_block">磅</span>
          </label>
        </div>
      </div>
      <a class="budget_shipment_btn" @click.prevent="computeFreight">估算转运费</a>
    </form>

    <section class="budget_result" v-if="companyByCid">
      <h3 class="tit3">估算结果如下:</h3>
      <div v-for="shipCompany in companyByCid.company">
        <div class="post_company_name">
          <span class="dot_fill"></span>
          <span class="txt_con">转运公司<span class="font-weight_6">{{shipCompany.Name}}</span></span>
        </div>
        <table class="budget_result_tab">
          <tr>
            <td>转运方式</td>
            <td>国际运费(RMB)</td>
          </tr>
          <tr v-for="way in shipCompany.ShippingWaies">
            <td>{{way.Name}}</td>
            <td>{{compute(way)}}</td>
          </tr>
        </table>
      </div>
    </section>

    <footer class="shopping_footer">
      <div class="icon_shopping_cart_1" v-link="{name:'cart'}">
        <img class="icon_go_back_cart" :src="images.iconShoppingCard_1_1"
             alt=""> <span class="goback_cart">返回购物车</span></div>
    </footer>
  </div>
</template>

<script>
  import images from '../../asset/images'
  import { cart, app } from '../../store/action'
  import { rangeAlgo, mathAlgo } from '../../services/ship.svc'
  import { WayType, lbToG } from '../../local/config.enum'

  export default{
    data(){
      return {
        images,
        selectedCountry: 0,
        freightWeight: '',
        gUnit: true
      }
    },
    vuex: {
      getters: {
        countries: state => state.cart.countries,
        companyAndWay: state => state.cart.company.companyAndWay
      },
      actions: {
        setCountryRate: cart.setCountryRate,
        setCompanyAndWay: cart.setCompanyAndWay,
        setSubmitLoading: app.setSubmitLoading,
        showAlert: app.showAlert
      }
    },
    computed: {
      companyByCid () {
        return this.companyAndWay.find(item => item.countryId === this.selectedCountry)
      }
    },
    methods: {
      selectCountry (id) {
        this.selectedCountry = id
      },
      isSelected (id) {
        return this.selectedCountry === id
      },
      computeFreight () {
        if (this.$weightValidation.weight.invalid) {
          this.$weightValidation.weight.modified = true
          return this.showAlert(this.$weightValidation.weight.errors[0].message)
        }
        if (this.companyAndWay.findIndex(item => item.countryId === this.selectedCountry) < 0) {
          this.setSubmitLoading(true, '正在估算...')
          cart.getCompanyAndWay(this.$route.params.key, this.selectedCountry)
            .then(res => {
              if (res.Success) {
                this.setCompanyAndWay(this.selectedCountry, res.List)
              }
            })
        }
      },
      compute (shipWay) {
        const unitRate = this.gUnit ? 1 : lbToG
        if (shipWay.WayType === WayType.Range) {
          return rangeAlgo(this.freightWeight * unitRate, shipWay.Service, shipWay.Rate)
        }
        if (shipWay.WayType === WayType.Math) {
          return mathAlgo(
            this.freightWeight,
            shipWay.FirstWeight * unitRate,
            shipWay.FirstWeightPrice,
            shipWay.ContinuedWeight,
            shipWay.ContinuedWeightPrice,
            shipWay.Rate
          ).toFixed(2)
        }
      }
    },
    route: {
      data({ to: { params: { key } } }){
        if (this.countries.length < 1) {
          return this.setCountryRate(key)
            .then(res => {
              if (res.Success) {
                this.selectedCountry = this.countries[0].Id
              }
            })
        } else {
          this.selectedCountry = this.countries[0].Id
          return {}
        }
      },
      waitForData: true
    }
  }
</script>
