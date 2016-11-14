<template>
  <div></div>
</template>

<script>
  import { setSession, deleteSession } from '../services/storage'
  import { sessionConfig } from '../local/config.enum'
  import { app } from '../store/action'

  export default {
    vuex: {
      actions: {
        setAppCurrency: app.setAppCurrency
      }
    },
    route: {
      data ({ to: { params: { route, key, authkey } } }) {
        if (key !== 'no') {
          this.setAppCurrency(key)
          setSession(sessionConfig.Key, key)
          deleteSession(sessionConfig.AuthKey)
          return this.$router.go({ name: route, params: { key: key } })
        }
        setSession(sessionConfig.LoginRoute, route)
        setSession(sessionConfig.AuthKey, authkey)
        deleteSession(sessionConfig.Key)
        return this.$router.go({ name: 'login' })
      }
    }
  }
</script>
