export default {
  title: 'routes.order',
  name: 'order',
  auth: false,
  component: resolve => require(['../views/order/index'], resolve),
  subRoutes: {
    '/fill': {
      name: 'fillOrder',
      component: resolve => require(['../views/order/fill'], resolve)
    },
    '/modify': {
      name: 'modifyOrder',
      component: resolve => require(['../views/order/modify'], resolve)
    }
  }

}
