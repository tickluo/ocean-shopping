import cart from './views/cart/cart.vue'
import detail from './views/cart/detail.vue'

export default router => {
  router.map({
    '/cart': {
      title: 'routes.cart',
      name: 'cart',
      auth: false,
      component: cart
    },
    '/cart/detail/:type': {
      title: 'routes.cart.detail',
      name: 'detail',
      auth: false,
      component: detail
    }
  })

  router.afterEach(() => {
    window.scrollTo(0, 0)
  })

// If no route is matched redirect to default
  router.redirect({
    '*': '/cart/detail/:type=fill'
  })
}

