import cart from './views/cart/cart.vue'
import detail from './views/cart/detail.vue'

export default router => {
  router.map({
    '/cart/:key': {
      title: 'routes.cart',
      name: 'cart',
      auth: false,
      component: cart
    },
    '/product/detail/:key': {
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
    '*': '/cart:key'
  })
}

