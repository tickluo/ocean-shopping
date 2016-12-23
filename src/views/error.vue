<template>
  <div class="top_leave_wrap">
    <div class="err_con">
      <p class="font_size_30"> {{errMsg}}！请返回重试 ∑( ° △ °|||)︴</p>
      <!--<a href="#" class="back_retest">返回重试</a>-->
    </div>
  </div>
</template>

<script>
  import { getSession } from '../services/storage.svc'
  import { sessionConfig } from '../local/config.enum'

  export default{
    computed: {
      errMsg () {
        const msg = getSession(sessionConfig.ErrorMsg)
        return msg || '啊哦，出错了'
      }
    }
  }
</script>
