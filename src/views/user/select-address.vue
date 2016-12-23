<template>
  <div>
    <v-loading v-if="$loadingRouteData"></v-loading>
    <div v-if="!$loadingRouteData" class="" v-fix-bottom>
      <section class="change_address">
        <div class="user_address_name">
          <a class="wid_btn" v-link="{name:'addAddress'}">
            <img :src="images.iconAdd" alt="" class="icon_location">
            <span class="dis_inline_block">添加收货地址</span></a>
        </div>
      </section>
      <article class="user_addresses_wrap">
        <div v-for="address in addresses">
          <section class="user_address_box chosed_address">
                <span v-if="needSelect"
                      class="icon_circle_stroke"
                      :class="{'icon_circle_fill':selectId === address.Id}"
                      @click="changeAddress(address.Id)">
                    <input type="radio" name="choice_address">
                </span>
            <span class="user_address_con">
                    <h4><span class="font_size_30 dis_inline_block">{{address.RecipientName}}</span>
                      <span v-if="address.IsDefault" class="circle_rect">默认地址</span></h4>
                    <div class="mar_top_5">{{address.Province}} {{address.City}} {{address.Area}}</div>
                    <div class="mar_top_5">{{address.StreetAddress1}}</div>
                    <div class="mar_top_5">
                        身份证已上传({{address.IdCard.substr(0,4)}}************{{address.IdCard.substr(-4,4)}})
                    </div>
                </span>
          </section>
          <ul class="cart_opera_list">
            <li><a @click.prevent="modifyAddress(address.Id)">修改地址</a></li>
            <li><a @click.prevent="deleteAddress(address.Id)">删除地址</a></li>
          </ul>
        </div>
      </article>
    </div>
    <footer class="shopping_footer" v-disable-tap>
      <div class="icon_shopping_cart_1" @click="returnBack">
        <img class="icon_go_back_cart icon_back" :src="images.iconGoback" alt="">
        <span class="goback_cart">上一步</span></div>
      <div v-if="needSelect" class="into_cart_btn" @click="saveChangeAddress">
        <img class="icon_into_shopping_cart" :src="images.iconOk"/>
        <span class="dis_inline_block">选择该收货地址</span></div>
    </footer>
  </div>
</template>

<script>
  import images from '../../asset/images'
  import VLoading from '../../components/v-loading.vue'
  import { user, app } from '../../store/action'

  export default{
    data(){
      return {
        images,
        addresses: []
      }
    },
    components: {
      VLoading
    },
    vuex: {
      getters: {
        selectAddress: state => state.user.selectAddress
      },
      actions: {
        setSelectAddress: user.setSelectAddress,
        setDefaultAddress: user.setDefaultAddress,
        setModifyAddress: user.setModifyAddress,
        showConfirm: app.showConfirm,
        setSubmitLoading: app.setSubmitLoading
      }
    },
    computed: {
      selectId () {
        if (this.addresses.length === 0) return 0
        if (this.selectAddress !== 0) return this.selectAddress
        return this.addresses.find(item => item.IsDefault).Id
      },
      needSelect () {
        return this.$route.name === 'selectAddress'
      }
    },
    methods: {
      returnBack () {
        window.history.go(-1)
      },
      changeAddress (id) {
        return this.setSelectAddress(id)
      },
      saveChangeAddress () {
        this.setDefaultAddress(this.addresses.find(item => item.Id === this.selectId))
        this.returnBack()
      },
      modifyAddress (addressId) {
        this.setModifyAddress(this.addresses.find(item => item.Id === addressId))
        this.$router.go({ name: 'addAddress' })
      },
      deleteAddress (addressId) {
        //get next addressId
        const index = this.addresses.findIndex(item => item.Id === addressId)
        const nextId = this.addresses.length > (index + 1) ? this.addresses[index + 1].Id : 0
        this.showConfirm({
          tip: '是否删除该地址',
          button: '删除',
          success: '地址已删除',
          fail: '地址删除失败',
          handle: () => {
            this.setSubmitLoading(true, '正在删除地址...')
            return user.deleteAddress(addressId, nextId)
              .then(res => {
                this.setSubmitLoading(false)
                if (res.Success) {
                  this.addresses.splice(index, 1)
                }
                return Promise.resolve(res)
              })
          }
        })
      }
    },
    route: {
      data(){
        return user.getUserAddress()
          .then(res => {
            if (res.Success) {
              this.addresses = res.List
            }
          })
      }
    }
  }
</script>
