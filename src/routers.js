import cart from './views/cart/cart.vue'
import detail from './views/cart/shopping-detail.vue'
import company from './views/cart/company.vue'
import selectCompany from './views/cart/company-select.vue'
import modify from './views/cart/shopping-modify.vue'
import submit from './views/cart/submit.vue'
import submitShopping from './views/cart/submit-shopping.vue'
import faq from './views/cart/faq.vue'
import order from './views/order/order.vue'
import shopOrder from './views/order/order-shopping.vue'
import storeOrder from './views/order/order-store.vue'
import shopOrderDetail from './views/order/order-shopping-detail.vue'
import storeOrderAfter from './views/order/order-store-after.vue'
import storeOrderBefore from './views/order/order-store-before.vue'

export default router => {
  router.map({
    '/cart/:key': {
      title: '购物车',
      name: 'cart',
      auth: false,
      component: cart
    },
    '/product/detail/:key': {
      title: '填写代购单',
      name: 'detail',
      auth: false,
      component: detail
    },
    '/product/detail/:key/:Id/:shopId': {
      title: '修改代购单',
      name: 'detailModify',
      auth: false,
      component: modify
    },
    '/cart/company/:key': {
      title: '选择转运公司',
      name: 'company',
      auth: false,
      component: company
    },
    '/cart/company/select/:key/:countryId': {
      title: '选择转运公司',
      name: 'selectCompany',
      auth: false,
      component: selectCompany
    },
    '/cart/submit/:key': {
      title: '提交订单',
      name: 'submit',
      auth: false,
      component: submit,
      subRoutes: {
        '/': {
          name: 'submitShopping',
          component: submitShopping
        },
        '/faq': {
          name: 'submitFaq',
          component: faq
        }
      }
    },
    '/order/:key': {
      title: '我的订单',
      name: 'orderList',
      auth: false,
      component: order,
      subRoutes: {
        '/': {
          name: 'shopOrder',
          component: shopOrder
        },
        '/store': {
          name: 'storeOrder',
          component: storeOrder,
          subRoutes: {
            '/before': {
              name: 'storeOrderBefore',
              component: storeOrderBefore
            },
            '/after': {
              name: 'storeOrderAfter',
              component: storeOrderAfter
            }
          }
        },
        './transport': {
          name: 'tranOrder',
          component: storeOrder
        }
      }
    },
    'order/detail/:id/:key': {
      title: '订单详情',
      name: 'shopOrderDetail',
      auth: false,
      component: shopOrderDetail
    }
  })

  router.afterEach(() => {
    window.scrollTo(0, 0)
  })

// If no route is matched redirect to default
  router.redirect({
    '*': '/cart/:key'
  })
}

