import Vue from 'vue'
import Router from 'vue-router'
import VueValidator from 'vue-validator'

import App from './app.vue'
import routers from './routers'
import regValidator from './services/valid.svc'

// Install plugins
Vue.use(VueValidator)
Vue.use(Router)

// register validator
regValidator(Vue)

// Set up a new router
const router = new Router({
  history: false,
  saveScrollPosition: true,
  linkActiveClass: 'link-active'
})

// Route config
routers(router)

// Start up our app
router.start(App, '#app')
