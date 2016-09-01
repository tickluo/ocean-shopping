export default {
  title: 'routes.order',
  name: 'order',
  auth: false,
  component: resolve => require(['../views/order/index'], resolve),
  subRoutes: {
    '/fill': {
      name: 'order/fill',
      component: resolve => require(['../views/order/fill'], resolve)
    },
    '/modify': {
      name: 'order/modify',
      component: resolve => require(['../views/order/modify'], resolve)
    }
  }

}
