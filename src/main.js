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

// directive
Vue.directive('fix-bottom', {
  bind () {
    const el = this.el
    if (el.className) {
      el.className += ' scrollable'
    } else {
      el.className = 'scrollable'
    }
    let sy = 0
    el.addEventListener('touchstart', (e) => {
      sy = e.pageY
    })
    el.addEventListener('touchmove', (e) => {
      const down = (e.pageY - sy > 0)
      const up = (e.pageY - sy < 0)
      // top
      if (down && el.scrollTop <= 0) {
        e.preventDefault()
      }
      // bottom
      if (up && el.scrollTop >= el.scrollHeight - el.clientHeight) {
        e.preventDefault()
      }
    })
  }
})
// prevent_swipe
Vue.directive('prevent-swipe', {
  bind () {
    const el = this.el
    let sy = 0
    el.addEventListener('touchstart', (e) => {
      sy = e.pageY
    })
    el.addEventListener('touchmove', (e) => {
      const down = (e.pageY - sy > 0)
      const up = (e.pageY - sy < 0)
      // top
      if (down && el.scrollTop <= 0) {
        e.preventDefault()
      }
      // bottom
      if (up && el.scrollTop >= el.scrollHeight - el.clientHeight) {
        e.preventDefault()
      }
    })
  }
})

// disable dom toucheStart
Vue.directive('disable-tap', {
  bind () {
    const el = this.el
    el.addEventListener('touchmove', (e) => {
      e.preventDefault()
    }, false)
  }
})

// Start up our app
router.start(App, '#app')
