import cart from './views/cart/cart.vue'
import detail from './views/cart/shopping-detail.vue'
import company from './views/cart/company.vue'
import selectCompany from './views/cart/company-select.vue'
import submit from './views/cart/submit.vue'
import submitShopping from './views/cart/submit-shopping.vue'
import faq from './views/layout/faq.vue'
import order from './views/order/order.vue'
import shopOrder from './views/order/order-shopping.vue'
import storeOrder from './views/order/order-store.vue'
import shopOrderDetail from './views/order/order-shopping-detail.vue'
import storeOrderAfter from './views/order/order-store-after.vue'
import storeOrderBefore from './views/order/order-store-before.vue'
import addAddress from './views/user/add-address.vue'
import selectAddress from './views/user/select-address.vue'
import storeOrderDetail from './views/order/order-store-detail.vue'
import submitTransport from './views/order/submit-transport.vue'
import mergeStore from './views/order/package-merge.vue'
import tranOrder from './views/order/order-transport.vue'
import tranOrderDetail from './views/order/order-transport-detail.vue'
import freightDetail from './views/cart/freight-detail.vue'
import idCardExample from './views/user/idcard-example.vue'
import expressDetail from './views/order/express-detail.vue'
import expressSite from './views/order/express-site.vue'

export default router => {
  router.map({
    '/user/address/add/:key': {
      title: '添加收货地址',
      name: 'addAddress',
      component: addAddress
    },
    '/user/address/select/:key': {
      title: '选择收货地址',
      name: 'selectAddress',
      component: selectAddress
    },
    '/idcard/example/:key': {
      title: '身份证照片示例',
      name: 'idCardExample',
      component: idCardExample
    },
    '/cart/:key': {
      title: '购物车',
      name: 'cart',
      auth: false,
      component: cart
    },
    '/product/detail/:key/': {
      title: '填写代购单',
      name: 'detail',
      auth: false,
      component: detail
    },
    '/product/detail/:key/:Id/:shopId': {
      title: '修改代购单',
      name: 'detail',
      auth: false,
      component: detail
    },
    '/freight/detail/:key': {
      title: '国际运费说明',
      name: 'freight',
      auth: false,
      component: freightDetail
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
        '/transport': {
          name: 'tranOrder',
          component: tranOrder
        }
      }
    },
    '/order/detail/:id/:key': {
      title: '订单详情',
      name: 'shopOrderDetail',
      auth: false,
      component: shopOrderDetail
    },
    '/store/detail/:id/:key': {
      title: '包裹详情',
      name: 'storeOrderDetail',
      auth: false,
      component: storeOrderDetail
    },
    '/transport/detail/:id/:key': {
      title: '转运详情',
      name: 'tranOrderDetail',
      auth: false,
      component: tranOrderDetail
    },
    '/store/submit/:id/:type/:key': {
      title: '提交转运',
      name: 'submitStore',
      component: submitTransport
    },
    '/store/merge/:id/:key': {
      title: '选择合箱包裹',
      name: 'mergeStore',
      component: mergeStore
    },
    '/order/express/detail/:key': {
      title: '转运物流跟踪',
      name: 'expressDetail',
      component: expressDetail
    },
    '/order/express/site/:key': {
      title: '物流查询',
      name: 'expressSite',
      component: expressSite
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

