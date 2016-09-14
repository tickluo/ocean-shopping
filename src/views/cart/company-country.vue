<template>
  <article class="post_country_company">
    <h3 class="tit4">
      您有商品从<span class="font-weight_6">{{countryInfo.Name}}</span>发货，请选择转运公司
    </h3>
    <company-detail v-for="item in companyList"
                    :is_default="true"
                    :ship_Way="shipDefaultWay"
                    :ship_company="company.ShippingCompany">
    </company-detail>
    <div class="sel_other_company"><span class="flex_width">共有两家可选</span>
      <a v-link="{name:'selectCompany',params:{countryId:company.CountryId}}" class="sel_other_company_btn">选择其他转运公司 >
      </a>
    </div>
  </article>
</template>

<script>
  import companyDetail from './company-detail.vue'
  import { cart } from '../../store/action'
  export default{
    props: ['company'],
    data(){
      let companyList = []
      return {
        shipDefaultWay: this.company.ShippingCompany.ShippingWayDefault,
        companyList: companyList.push(this.company)
      }
    },
    vuex: {
      getters: {
        countries: state => state.cart.countries
      }
    },
    computed: {
      countryInfo () {
        return this.countries.find(item => item.Id === this.company.CountryId)
      }
    },
    components: {
      companyDetail
    }
  }
</script>
