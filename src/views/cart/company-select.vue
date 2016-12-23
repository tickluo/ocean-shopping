<template>
  <div>
    <v-loading v-if="$loadingRouteData"></v-loading>
    <article v-if="!$loadingRouteData" class="bg_fff" v-fix-bottom="ss">
      <h3 class="tit4">
        您有商品从<span class="font-weight_6">{{countryInfo &&　countryInfo.Name}}</span>发货，请选择转运公司
      </h3>
      <company-detail v-if="ShippingCompanyId" v-for="item in companyList"
                      :is-default="false"
                      :is-selected="item.ShippingWayDefault.ShippingCompanyId === ShippingCompanyId"
                      :ship-way="item.ShippingWayDefault"
                      :ship-company="item">
      </company-detail>
    </article>

    <footer class="shopping_footer" v-disable-tap>
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
  import VLoading from '../../components/v-loading.vue'
  import { cart } from '../../store/action'
  import images from '../../asset/images'

  export default{
    data(){
      return {
        companyList: [],
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
        return this.countries.find(item => item.Id === parseInt(this.$route.params.countryId)
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
        this.setCompanyByCid(parseInt(this.$route.params.countryId), {
          CountryId: parseInt(this.$route.params.countryId),
          ShippingCompanyCount: this.companyList.length,
          ShippingCompany: this.companyList
            .find(item => item.ShippingWayDefault.ShippingCompanyId === this.ShippingCompanyId)
        })
        this.$router.go({ name: 'company' })
      }
    },
    components: {
      companyDetail,
      VLoading
    },
    route: {
      data({ to: { params: { countryId } } }){
        return cart.getCompanyByCid(countryId)
          .then(data => {
            this.companyList = []
            data.List.forEach((item, index) => {
              this.companyList.$set(index, item)
            })
            this.ShippingCompanyId = this.companyList[0].ShippingWayDefault.ShippingCompanyId
          })
      }
    }
  }
</script>
