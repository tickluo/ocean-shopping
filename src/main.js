import Vue from 'vue'
import VueX from 'vuex'
import Resource from 'vue-resource'
import Router from 'vue-router'

import App from './app.vue'
import routes from './routes'

// Install plugins
Vue.use(Router)
Vue.use(VueX)
Vue.use(Resource)

// Set up a new router
const router = new Router({
  history: false,
  saveScrollPosition: true,
  linkActiveClass: 'link-active'
})

// Route config
router.map(routes)

router.afterEach(function () {
  window.scrollTo(0, 0)
})

// If no route is matched redirect to default
router.redirect({
  '*': '/order/fill'
})

// Start up our app
router.start(App, '#app')
