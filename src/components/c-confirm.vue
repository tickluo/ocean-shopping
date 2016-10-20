<template>
  <section class="pop_wrap_address" v-if="confirm.show">
    <div class="real_pop_address">
      <img :src="images.iconQuestion" alt="" class="icon_warn">
      <p class="font_size_30">
        {{confirm.checkMsg}}
      </p>
      <div class="cancel_ok_wrap">
        <a class="cancel_btn" @click="hideConfirm">
          取消
        </a>
        <a class="cancel_btn ok_btn" @click="wrapHandle">
          {{confirm.handleMsg}}
        </a>
      </div>
    </div>
  </section>
</template>

<script>
  import images from '../asset/images'
  import { app } from '../store/action'

  export default{
    data(){
      return {
        images
      }
    },
    vuex: {
      getters: {
        confirm: state => state.app.confirm
      },
      actions: {
        hideConfirm: app.hideConfirm,
        showAlert: app.showAlert
      }
    },
    methods: {
      wrapHandle () {
        this.hideConfirm()
        let successMsg = this.confirm.successMsg
        let failMsg = this.confirm.failMsg
        this.confirm.handle()
          .then(res => {
            if (res.Success) {
              return this.showAlert(successMsg)
            }
            return this.showAlert(failMsg)
          })
      }
    }
  }
</script>
