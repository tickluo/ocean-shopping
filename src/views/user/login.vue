<template xmlns:v-validate="http://www.w3.org/1999/xhtml">
  <section class="user_login_wrap">
    <validator name="loginValidation">
      <div class="login_input">
        <input class="fill_other_input"
               type="text"
               :class="{'err_input':
                     $loginValidation.phone &&
                     $loginValidation.phone.modified &&
                     $loginValidation.phone.invalid}"
               v-validate:phone="{
                     required: { rule: true, message: '请输入手机号' },
                     telephone:{ rule: true, message: '请输入正确的手机号' }
                     }"
               v-model="loginPhone"
               placeholder="手机号">
      </div>
      <div class="login_input">
        <input class="fill_other_input"
               type="password"
               :class="{'err_input':
                     $loginValidation.captcha &&
                     $loginValidation.captcha.modified &&
                     $loginValidation.captcha.invalid}"
               v-validate:captcha="{
                     required: { rule: true, message: '请输入密码' },
                     maxlength:{ rule: 20, message: '密码不能超过20位' },
                     minlength:{ rule: 6, message: '密码不能少于6位' }
                     }"
               v-model="loginPassword"
               placeholder="密码" autocomplete="off">
      </div>
    </validator>
    <a v-link="" class="forget_pas_link">忘记密码？</a>
    <a @click.prevent="login"
       :class="{'disabled_btn':valid}"
       class="login_btn wid_btn">登录</a>
  </section>
</template>

<script>
  import userApi from '../../webServices/user.wsvc'
  import { app } from '../../store/action'
  import { getSession } from '../../services/storage.svc'
  import { sessionConfig } from '../../local/config.enum'

  export default {
    data () {
      return {
        loginBtn: true,
        loginPhone: '',
        loginPassword: ''
      }
    },
    computed: {
      valid () {
        return this.$loginValidation.invalid || !this.loginBtn
      }
    },
    vuex: {
      actions: {
        showAlert: app.showAlert,
        setSubmitLoading: app.setSubmitLoading
      }
    },
    methods: {
      login () {
        if (this.valid) return false
        this.loginBtn = false
        this.setSubmitLoading(true, '登录中...')
        userApi.userLogin({
          Phone: this.loginPhone,
          Password: this.loginPassword,
          LKey: getSession(sessionConfig.AuthKey)
        })
          .then(res => {
            this.setSubmitLoading(false)
            if (res.Success) {
              const routeName = getSession(sessionConfig.LoginRoute)
              this.loginBtn = true
              this.showAlert('登录成功')
              return this.$router.go({ name: 'entry', params: { route: routeName, key: res.Data.Key, authkey: 'no' } })
            }
            this.showAlert(res.Message)
          })
      }
    }
  }
</script>
