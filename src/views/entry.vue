<template>
  <div></div>
</template>

<script>
  import { setSession, deleteSession } from '../services/storage.svc'
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
          setSession(sessionConfig.Key, key)
          deleteSession(sessionConfig.AuthKey)
          this.setAppCurrency()
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
