import cartApi from '../webServices/cart.wsvc'
import orderApi from '../webServices/order.wsvc'
import * as types from './mutation-types'

const orderListData = require('../mock/order-list.json')
const appCurrency = require('../mock/app-currency.json')
const orderDetail = require('../mock/order-display.json')
const packageList = require('../mock/package-list.json')
const packageDetail = require('../mock/package-detail.json')

const app = {
  setAppCurrency ({ dispatch }, token) {
    dispatch(types.SET_APP_CURRENCY, appCurrency)
    return Promise.resolve(appCurrency)
  },
  getRegion () {
    return localRegion.List
  }
}

const cart = {
  getShopping ({ dispatch }, token) {
    return cartApi.getShopping('307480468f2bb43dd01b190a169c8084547b4403')
      .then(shopping => {
        dispatch(types.RECEIVE_SHOPPING_INFO, shopping.Data)
      })
  },
  getExchangeRate (token, domain) {
    return cartApi.getShopRate('307480468f2bb43dd01b190a169c8084547b4403', domain)
    /* .then(rate => {
     if (rate.List.length > 0) {
     return Promise.resolve(rate)
     }
     return cartApi.getCountryRate('307480468f2bb43dd01b190a169c8084547b4403')
     }).then(rate => rate)*/
  },
  setShoppingRate ({ dispatch }, token, rateList) {
    return cartApi.getCountryRate('307480468f2bb43dd01b190a169c8084547b4403')
      .then((res) => dispatch(types.SAVE_COUNTRY_RATE, rateList, res.List))
  },
  initShoppingDisplay ({ dispatch }, detail) {
    dispatch(types.INIT_SHOPPING_DISPLAY, detail)
  },
  updateShoppingDisplay ({ dispatch }, detail) {
    dispatch(types.UPDATE_SHOPPING_DISPLAY, detail)
  },
  getCartList ({ dispatch }, token) {
    return cartApi.getCartList('307480468f2bb43dd01b190a169c8084547b4403')
      .then(cartInfo => dispatch(types.GET_CART_LIST, cartInfo.List))
  },
  selectAll ({ dispatch }, toggle) {
    dispatch(types.SELECT_ALL_SHOPPING, toggle)
  },
  selectShop ({ dispatch }, toggle, shopId) {
    dispatch(types.SELECT_SHOP_SHOPPING, toggle, shopId)
  },
  selectShopping ({ dispatch }, toggle, shopId, id) {
    dispatch(types.SELECT_SHOPPING, toggle, shopId, id)
  },
  addShoppingCount ({ dispatch }) {
    dispatch(types.INCREASE_SHOPPING_COUNT)
  },
  reduceShoppingCount ({ dispatch }) {
    dispatch(types.DECREASE_SHOPPING_COUNT)
  },
  addToCart (token, shopping) {
    return cartApi.addToCart('307480468f2bb43dd01b190a169c8084547b4403', shopping)
  },
  removeShopping ({ dispatch }, token, shopId, id) {
    cartApi.removeShopping('307480468f2bb43dd01b190a169c8084547b4403', id)
      .then(res => {
        if (res.Success) {
          return dispatch(types.REMOVE_SHOPPING_BY_ID, shopId, id)
        }
        return Promise.reject(res.Message)
      })
  },
  getDefaultCompany ({ dispatch }, token, countryIds) {
    return cartApi.getDefaultCompany('307480468f2bb43dd01b190a169c8084547b4403', countryIds)
      .then(res => {
        dispatch(types.SET_DEFAULT_COMPANY, res.List)
        return res.List
      })
  },
  getCompanyByCid (token, countryId) {
    return cartApi.getCompanyByCid('307480468f2bb43dd01b190a169c8084547b4403', countryId)
  },
  setCompanyByCid ({ dispatch }, countryId, company) {
    dispatch(types.SET_COMPANY_BY_CID, countryId, company)
  }
}

const orders = {
  saveOrder (order) {
    return orderApi.saveOrder(order)
  },
  getOrderList ({ dispatch }, token, page) {
    dispatch(types.SET_ORDER_LIST, orderListData.List)
    return Promise.resolve(orderListData)
  },
  getOrderDetail ({ dispatch }, token, id) {
    dispatch(types.SET_DISPLAY_ORDER, orderDetail.Data)
    return Promise.resolve(orderDetail)
  },
  getPackageList ({ dispatch }, token, type) {
    dispatch(types.SET_PACKAGE_LIST, type, packageList.List)
    return Promise.resolve(packageList)
  },
  getStoreDetail ({ dispatch }, token, id) {
    dispatch(types.SET_DISPLAY_PACKAGE, packageDetail.Data)
    return Promise.resolve(packageDetail)
  }
}

const user = {
  getDefaultAddress ({ dispatch }, token) {
    return userApi.getDefaultAddress({ key: '307480468f2bb43dd01b190a169c8084547b4403' })
      .then(data => {
        if (data.Success) {
          dispatch(types.SET_DEFAULT_ADDRESS, data.Data)
        }
        return Promise.resolve(data)
      })
  }
}

export {
  app,
  cart,
  user,
  orders
}
