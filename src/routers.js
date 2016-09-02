export default router => {
  router.map({
    '/cart': {
      title: 'routes.cart',
      name: 'cart',
      auth: false,
      component: reslove => {
        return require(['./views/cart/cart.vue'], reslove)
      }
    },
    '/cart/detail/:type': {
      title: 'routes.cart.detail',
      name: 'detail',
      auth: false,
      component: reslove => {
        return require(['./views/cart/detail.vue'], reslove)
      }
    }
  })

  router.afterEach(function () {
    window.scrollTo(0, 0)
  })

// If no route is matched redirect to default
  router.redirect({
    '*': '/cart/detail/:type=fill'
  })
}

