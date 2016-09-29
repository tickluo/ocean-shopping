<template xmlns:v-validate="http://www.w3.org/1999/xhtml" xmlns:v-el="http://www.w3.org/1999/xhtml">
  <div>
    <validator name="addressValidation">
      <article class="base_info">
        <input type="text"
               :class="{'err_input':
                     $addressValidation.name &&
                     $addressValidation.name.modified &&
                     $addressValidation.name.invalid}"
               v-validate:name="{
                     required: { rule: true, message: '请输入收件人姓名' }
                     }"
               class="buyer_name"
               v-model="address.RecipientName"
               placeholder="收件人">
        <div class="address_tips">
          收件人姓名需与身份证姓名一致，否则影响清关
        </div>
        <input type="text"
               :class="{'err_input':
                     $addressValidation.phone &&
                     $addressValidation.phone.modified &&
                     $addressValidation.phone.invalid}"
               v-validate:phone="{
                     required: { rule: true, message: '请输入收件人手机号' },
                     telephone:{ rule: true, message: '请输入正确的手机号' }
                     }"
               class="buyer_name"
               v-model="address.PhoneNumber"
               placeholder="联系电话">
        <div class="address_tips pad_top_30">
          <div class="font_size_30">
            收件人身份证信息
          </div>
          <div>所有身份信息将被严格保密，仅用于清关</div>
        </div>
        <input type="text"
               :class="{'err_input':
                     $addressValidation.idcard &&
                     $addressValidation.idcard.modified &&
                     $addressValidation.idcard.invalid}"
               v-validate:idcard="{
                     required: { rule: true, message: '请输入身份证号' },
                     idcard: { rule: true, message: '请输入正确的身份证号' }
                     }"
               class="buyer_name"
               v-model="address.IdCard"
               placeholder="身份证号">
        <div class="address_tips pos_r">
          <div>
            ★身份证照片必须清晰、无水印、死角边框齐<br/>
            全，且身份证未过期。否则包裹将无法清关。
          </div>
          <a href="#" class="scan_example">查看示例</a>
        </div>
        <div class="upfile_card_wrap">
          <ul class="upfile_card_list">
            <li>
              <input id="filePositive" type="file" @change="uploadImg('positive')" accept="image/*"/>
              <div class="id_card">
              <span class="del_btn" v-if="hasPoImg" @click="deleteImg('positive')"><img :src="images.iconX"
                                                                                        alt=""></span>
                <img v-if="hasPoImg" class="icon_camera" :src="positiveImg" alt="">
              </div>
              <div class="up_side">身份证正面</div>
            </li>
            <li>
              <input id="fileOpposite" type="file" @change="uploadImg('opposite')" accept="image/*"/>
              <div class="id_card">
              <span class="del_btn" v-if="hasOpImg" @click="deleteImg('opposite')"><img :src="images.iconX"
                                                                                        alt=""></span>
                <img v-if="hasOpImg" class="icon_camera" :src="oppositeImg" alt="">
              </div>
              <div class="up_side">身份证反面</div>
            </li>
          </ul>
        </div>
      </article>

      <article class="base_info">
        <div class="selct_area">
          <input type="text"
                 :class="{'err_input':
                     $addressValidation.region &&
                     $addressValidation.region.modified &&
                     $addressValidation.region.invalid}"
                 v-validate:region="{
                     required: { rule: true, message: '请选择地区' }
                     }"
                 id="regionPicker"
                 v-el:region readonly="true"
                 class="buyer_name"
                 placeholder="选择所在区域">
          <img :src="images.iconR" alt="" class="icon_right">
        </div>
        <textarea class="buyer_name no_top_bor"
                  v-model="address.StreetAddress1"
                  :class="{'err_input':
                     $addressValidation.location &&
                     $addressValidation.location.modified &&
                     $addressValidation.location.invalid}"
                  v-validate:location="{
                     required: { rule: true, message: '请填写详细地址' }
                     }"
                  placeholder="详细地址..."></textarea>
        <input type="text" id="zipNumber" v-el:zip class="buyer_name no_top_bor" placeholder="邮政编码">
      </article>

      <article class="base_info" @click="setDefault">
        <div class="sel_other_company area_live" :class="{'open_static' : address.IsDefault}">
          <span class="flex_width corlor_33">设置为默认地址</span>
          <div class="on_off_btn">
            <span class="on_off_circle"></span>
          </div>
        </div>
      </article>
    </validator>

    <footer class="shopping_footer">
      <div class="icon_shopping_cart_1" @click="returnBack">
        <img class="icon_go_back_cart icon_back" :src="images.iconGoback" alt="">
        <span class="goback_cart">上一步</span></div>
      <div class="into_cart_btn" @click="saveAddress">
        <img class="icon_into_shopping_cart" :src="images.iconOk"/>
        <span class="dis_inline_block">保存收货地址</span>
      </div>
    </footer>
  </div>
</template>
<style>
  .gearArea {
    font-family: PingFangSC-Light, "Microsoft Yahei", "微软雅黑", sans-serif;
    font-size: 20px;
    background-color: rgba(0, 0, 0, 0.2);
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9900;
    overflow: hidden;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both
  }

  .area_ctrl {
    vertical-align: middle;
    background-color: #d5d8df;
    color: #333;
    margin: 0;
    height: auto;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 9901;
    overflow: hidden;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }

  .slideInUp {
    -webkit-animation: slideInUp .3s;
    animation: slideInUp .3s;
  }

  @-webkit-keyframes slideInUp {
    from {
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0)
    }
    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0)
    }
  }

  @keyframes slideInUp {
    from {
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0)
    }
    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0)
    }
  }

  .area_roll {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    height: auto;
    overflow: hidden;
    background-color: transparent;
    -webkit-mask: -webkit-gradient(linear, 0% 50%, 0% 100%, from(#debb47), to(rgba(36, 142, 36, 0)));
    -webkit-mask: -webkit-linear-gradient(top, #debb47 50%, rgba(36, 142, 36, 0))
  }

  .area_roll > div {
    font-size: 1.4em;
    height: 13.9em;
    float: left;
    background-color: transparent;
    position: relative;
    overflow: hidden;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1
  }

  .area_roll > div .gear {
    width: 100%;
    float: left;
    position: absolute;
    z-index: 9902;
    margin-top: 4em
  }

  .area_roll_mask {
    -webkit-mask: -webkit-gradient(linear, 0% 40%, 0% 0%, from(#debb47), to(rgba(36, 142, 36, 0)));
    -webkit-mask: -webkit-linear-gradient(bottom, #debb47 50%, rgba(36, 142, 36, 0));
    padding: 0
  }

  .area_grid {
    position: relative;
    top: 4em;
    width: 100%;
    height: 2em;
    margin: 0;
    box-sizing: border-box;
    z-index: 0;
    border-top: 1px solid #abaeb5;
    border-bottom: 1px solid #abaeb5
  }

  .area_roll > div:nth-child(3) .area_grid > div {
    left: 42%
  }

  .area_btn {
    color: #0575f2;
    font-size: 1.4em;
    line-height: 1em;
    text-align: center;
    padding: .8em 1em
  }

  .area_btn_box:before,
  .area_btn_box:after {
    content: '';
    position: absolute;
    height: 1px;
    width: 100%;
    display: block;
    background-color: #ddd;
    z-index: 15;
    -webkit-transform: scaleY(0.33);
    transform: scaleY(0.33)
  }

  .area_btn_box {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: stretch;
    -webkit-align-items: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    background-color: #f1f2f4;
    position: relative
  }

  .area_btn_box:before {
    left: 0;
    top: 0;
    -webkit-transform-origin: 50% 20%;
    transform-origin: 50% 20%
  }

  .area_btn_box:after {
    left: 0;
    bottom: 0;
    -webkit-transform-origin: 50% 70%;
    transform-origin: 50% 70%
  }

  .tooth {
    height: 2em;
    line-height: 2em;
    text-align: center;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    overflow: hidden
  }
</style>
<script>
  import '../../asset/libs/LArea.min'
  import 'lrz/dist/lrz.bundle'
  import images from '../../asset/images'
  import { app, user } from '../../store/action'

  let area = new LArea()

  const initAddress = () => {
    return {
      Province: '',
      City: '',
      Area: '',
      RecipientName: '',
      PhoneNumber: '',
      Postalcode: '',
      StreetAddress1: '',
      IdCard: '',
      IdCardPositive: '',
      IdCardOpposite: '',
      IsDefault: true
    }
  }

  export default{
    data () {
      return {
        images,
        positiveImg: '',
        oppositeImg: '',
        address: initAddress()
      }
    },
    computed: {
      zipNumber () {
        return this.$els.zip.value
      },
      region () {
        let regionArr = this.$els.region.value.split(',')
        return {
          Province: regionArr[0],
          City: regionArr[1],
          Area: regionArr[2]
        }
      },
      hasPoImg () {
        return this.positiveImg !== ''
      },
      hasOpImg () {
        return this.oppositeImg !== ''
      }
    },
    vuex: {
      actions: {
        showAlert: app.showAlert
      }
    },
    ready () {
      app.getRegion().then(data => {
        area.init({
          'trigger': '#regionPicker',//触发选择控件的文本框，同时选择完毕后name属性输出到该位置
          'valueTo': '#zipNumber',//选择完毕后id属性输出到该位置
          'keys': { id: 'id', name: 'name' },//绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
          'type': 1,//数据源类型
          'data': data.List//数据源
        })
      })
    },
    methods: {
      returnBack () {
        window.history.go(-1)
      },
      uploadImg (type) {
        let context = this
        lrz(context.$event.target.files[0], { fieldName: 'idcart' })
          .then(data => {
            user.uploadIdCard(this.$route.params.key, data.base64.replace("data:" + data.file.type + ";base64,", ""))
              .then(res => {
                if (res.Success) {
                  this.showAlert('身份证上传成功')
                  if (type === 'positive') {
                    this.positiveImg = data.base64
                    this.address.IdCardPositive = res.Data.FilePath
                  }
                  else {
                    this.oppositeImg = data.base64
                    this.address.IdCardOpposite = res.Data.FilePath
                  }
                }
                else return  this.showAlert('身份证上传失败')
              })
          })
      },
      deleteImg (type) {
        if (type === 'positive') {
          this.address.IdCardPositive = ''
          this.positiveImg = ''
        }
        else {
          this.address.IdCardOpposite = ''
          this.oppositeImg = ''
        }
      },
      setDefault () {
        this.address.IsDefault = !this.address.IsDefault
      },
      saveAddress () {
        if (this.$addressValidation.invalid) {
          this.$addressValidation.errors.forEach(item => {
            this.$addressValidation[item.field].modified = true

          })
          return this.showAlert(this.$addressValidation.errors[0].message)
        }
        let addressInfo = Object.assign({}, this.address)
        addressInfo.Province = this.region.Province
        addressInfo.City = this.region.City
        addressInfo.Area = this.region.Area
        addressInfo.Postalcode = this.zipNumber
        user.saveAddress(this.$route.params.key, addressInfo)
          .then(res => {
            if (res.Success) {
              this.showAlert('保存成功')
              this.returnBack
            }
          })
      }
    }
  }
</script>
