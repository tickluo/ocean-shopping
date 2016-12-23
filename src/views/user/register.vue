<template xmlns:v-validate="http://www.w3.org/1999/xhtml">
  <div>
    <section class="user_login_wrap" v-if="step === 1">
      <validator name="regValidation">
        <div class="login_input">
          <input class="fill_other_input fill_veri_code"
                 type="text"
                 :class="{'err_input':
                     $regValidation.phone &&
                     $regValidation.phone.modified &&
                     $regValidation.phone.invalid}"
                 v-validate:phone="{
                     required: { rule: true, message: '请输入注册手机号' },
                     telephone:{ rule: true, message: '请输入正确的手机号' }
                     }"
                 v-model="regPhone"
                 placeholder="手机号">
        </div>
        <div class="login_input">
          <input class="fill_other_input"
                 type="text"
                 autocomplete="off"
                 :class="{'err_input':
                     $regValidation.captcha &&
                     $regValidation.captcha.modified &&
                     $regValidation.captcha.invalid}"
                 v-validate:captcha="{
                     required: { rule: true, message: '请输入验证码' },
                     length:{ rule: 4, message: '验证码长度错误' }
                     }"
                 v-model="regCaptcha"
                 placeholder="右侧验证码">
          <img class="veri_img"
               :src="captcha"
               @click="refreshCaptcha"
               alt="">
        </div>
      </validator>
      <a class="login_btn wid_btn register_btn"
         @click.prevent="submitReg"
         :class="{'disabled_btn':valid}">发送短信验证码</a>
    </section>
    <section class="user_login_wrap" v-if="step === 2">
      <validator name="regValidation2">
        <div class="login_input">
          <input class="fill_other_input fill_veri_code"
                 type="password"
                 autocomplete="off"
                 :class="{'err_input':
                     $regValidation2.password &&
                     $regValidation2.password.modified &&
                     $regValidation2.password.invalid}"
                 v-validate:captcha="{
                     required: { rule: true, message: '请输入注册密码' },
                     maxlength:{ rule: 20, message: '密码不能超过20位' },
                     minlength:{ rule: 6, message: '密码不能少于6位' }
                     }"
                 v-model="regPassword"
                 placeholder="密码 （6-20个字母或数字）">
        </div>
        <div class="login_input">
          <input class="fill_other_input"
                 type="text"
                 autocomplete="off"
                 :class="{'err_input':
                     $regValidation2.captcha &&
                     $regValidation2.captcha.modified &&
                     $regValidation2.captcha.invalid}"
                 v-validate:captcha="{
                     required: { rule: true, message: '请输入验证码' },
                     length:{ rule: 6, message: '验证码长度错误' }
                     }"
                 v-model="regMsgCaptcha"
                 placeholder="验证码">
          <a @click.prevent="resendMsg"
             class="send_again"
             :class="{'calc_btn_disabled':counting}">{{resendText}}</a>
        </div>
      </validator>
      <a @click.prevent="register"
         class="login_btn wid_btn register_btn"
         :class="{'disabled_btn':regValid}">确定</a>
    </section>
    <footer class="shopping_footer" v-if="step === 2">
      <div class="icon_shopping_cart_1" @click="returnBack">
        <img class="icon_go_back_cart icon_back" :src="images.iconGoback" alt="">
        <span class="goback_cart">返回</span></div>
    </footer>
  </div>
</template>

<script>
  import images from '../../asset/images'
  import appApi from '../../webServices/app.wsvc'
  import userApi from '../../webServices/user.wsvc'
  import { app } from '../../store/action'
  import { getSession } from '../../services/storage.svc'
  import { sessionConfig } from '../../local/config.enum'

  export default{
    data(){
      return {
        images,
        step: 1,
        sendBtn: true,
        regBtn: true,
        captcha: '',
        regPhone: '',
        regCaptcha: '',
        regPassword: '',
        regMsgCaptcha: '',
        counting: false,
        resendText: '重新发送'
      }
    },
    vuex: {
      actions: {
        showAlert: app.showAlert,
        setSubmitLoading: app.setSubmitLoading
      }
    },
    computed: {
      valid () {
        return this.$regValidation.invalid || !this.sendBtn
      },
      regValid () {
        return this.$regValidation2.invalid || !this.regBtn
      }
    },
    methods: {
      countDown () {
        let count = 60
        this.counting = true
        let timer = setInterval(()=> {
          if (count === 1) {
            this.resendText = '重新发送'
            this.counting = false
            return clearInterval(timer)
          }
          this.resendText = count--
        }, 1000)
      },
      returnBack () {
        this.step = 1
      },
      refreshCaptcha () {
        appApi.getCaptcha({ LKey: getSession(sessionConfig.AuthKey) })
          .then(res => {
            if (res.Success) {
              this.captcha = `data:image/gif;base64,${res.Data.ImageData}`
            }
          })
      },
      resendMsg () {
        if (this.counting) return false
        this.refreshCaptcha()
        this.step = 1
      },
      submitReg () {
        if (this.valid) return false
        this.setSubmitLoading(true, '正在发送...')
        this.sendMsg = false
        userApi.sendMessage({
          AuthCode: this.regCaptcha,
          Phone: this.regPhone,
          LKey: getSession(sessionConfig.AuthKey)
        })
          .then(res => {
            this.setSubmitLoading(false)
            if (res.Success) {
              this.sendMsg = true
              this.regPassword = ''
              this.regMsgCaptcha = ''
              this.countDown()
              this.step = 2
              return this.showAlert('已发送')
            }
            this.showAlert(res.Message)
          })
      },
      register () {
        if (this.regValid) return false
        this.setSubmitLoading(true, '注册中...')
        this.regBtn = false
        userApi.userRegister({
          AuthCode: this.regMsgCaptcha,
          Phone: this.regPhone,
          Password: this.regPassword,
          LKey: getSession(sessionConfig.AuthKey)
        })
          .then(res => {
            this.setSubmitLoading(false)
            if (res.Success) {
              const routeName = getSession(sessionConfig.LoginRoute)
              this.regBtn = true
              this.showAlert('注册成功')
              return this.$router.go({ name: routeName, params: { key: res.Data.Key } })
            }
            this.showAlert(res.Message)
          })
      }
    },
    ready(){
      this.refreshCaptcha()
    }
  }
</script>
