<template>
  <div>
    <article class="post_country_company">
      <h3 class="tit4">
        您有商品从<span class="font-weight_6">{{countryInfo.Name}}</span>发货，请选择转运公司
      </h3>
      <company-detail v-if="ShippingCompanyId" v-for="item in companyList"
                      :is_default="false"
                      :is_selected="item.ShippingWayDefault.ShippingCompanyId === ShippingCompanyId"
                      :ship_Way="item.ShippingWayDefault"
                      :ship_company="item">
      </company-detail>
    </article>

    <footer class="shopping_footer">
      <div class="icon_shopping_cart_1" @click="returnBack">
        <img class="icon_go_back_cart icon_back" :src="images.iconGoback" alt="">
        <span class="goback_cart">返回</span></div>
      <div class="into_cart_btn" @click="confirmCompany">
        <img class="icon_into_shopping_cart" :src="images.iconOk"/>
        <span class="dis_inline_block">确定</span>
      </div>
    </footer>
  </div>
</template>

<script>
  import companyDetail from './company-detail.vue'
  import { cart } from '../../store/action'
  import images from '../../asset/images'

  export default{
    data(){
      return {
        companyList: [],
        countryId: this.$route.params.countryId,
        images,
        ShippingCompanyId: 0
      }
    },
    vuex: {
      getters: {
        countries: state => state.cart.countries
      },
      actions: {
        setCompanyByCid: cart.setCompanyByCid
      }
    },
    events: {
      selectCompany: 'selectCompany'
    },
    computed: {
      countryInfo () {
        return this.countries.find(item => item.Id === parseInt(this.countryId)
        )
      }
    },
    methods: {
      returnBack () {
        window.history.go(-1)
      },
      selectCompany (ShippingCompanyId) {
        this.ShippingCompanyId = ShippingCompanyId
      },
      confirmCompany () {
        this.setCompanyByCid(parseInt(this.countryId), {
            CountryId: parseInt(this.countryId),
            ShippingCompany: this.companyList
              .find(item => item.ShippingWayDefault.ShippingCompanyId === this.ShippingCompanyId)
          }
        )
        this.$router.go({ name: 'company' })
      }
    },
    components: {
      companyDetail
    },
    route: {
      data({ to: { params: { key, countryId } } }){
        return cart.getCompanyByCid(key, countryId)
          .then(data => {
            this.companyList.$remove(this.companyList[0])
            data.List.forEach((item, index) => {
              this.companyList.$set(index, item)
            })
            this.ShippingCompanyId = this.companyList[0].ShippingWayDefault.ShippingCompanyId
          })
      },
      waitForData: true
    }
  }
</script>
