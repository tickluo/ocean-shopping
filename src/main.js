import Vue from 'vue'
import Router from 'vue-router'

import App from './app.vue'
import routers from './routers'

// Install plugins
Vue.use(Router)

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
