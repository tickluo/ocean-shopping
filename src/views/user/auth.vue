<template>
  <div>
    <ul class="sec_top_nav user_top_nav">
      <li :class="{cur_order:route === 'login'}">
        <a v-link="{name:'login'}">登录</a>
        <span class="bot_hr"></span>
      </li>
      <li :class="{cur_order:route === 'register'}">
        <a v-link="{name:'register'}">注册</a>
        <span class="bot_hr"></span>
      </li>
    </ul>
    <div class="pos_height_190">
      <router-view class="view" transition="slide-up" transition-mode="out-in" keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script>
  import userApi from '../../webServices/user.wsvc'
  import { getSession } from '../../services/storage'
  import { sessionConfig } from '../../local/config.enum'

  export default{
    computed: {
      route () {
        return this.$route.name
      }
    },
    route: {
      data () {
        userApi.canLogin({ LKey: getSession(sessionConfig.AuthKey) })
          .then(res => {
            if (!res.Data || !res.Data.IsLogin) {
              this.$router.go({ name: 'error' })
            }
          })
      }
    }
  }
</script>
