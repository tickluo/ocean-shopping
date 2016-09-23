import cartApi from '../webServices/cart.wsvc'
import appApi from '../webServices/app.wsvc'
import orderApi from '../webServices/order.wsvc'
import userApi from '../webServices/user.wsvc'
import * as types from './mutation-types'

const localRegion = require('../local/region.json')

const app = {
  setAppCurrency ({ dispatch }, token) {
    return appApi.getAppCurrency('307480468f2bb43dd01b190a169c8084547b4403')
      .then(data => {
        if (data.Success) return dispatch(types.SET_APP_CURRENCY, data.Data)
        return Promise.reject(data.Message)
      })
  },
  getRegion () {
    return localRegion.List
  },
  genPay ({ dispatch }, toggle) {
    return dispatch(types.GEN_PAY, toggle)
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
    return orderApi.getOrderList({ key: '307480468f2bb43dd01b190a169c8084547b4403', Page: page })
      .then(data => {
        if (data.Success) {
          dispatch(types.SET_ORDER_LIST, data.List)
        }
        return Promise.resolve(data)
      })
  },
  getOrderDetail ({ dispatch }, token, id) {
    return orderApi.getOrderDetail({ key: '307480468f2bb43dd01b190a169c8084547b4403', OrderId: id })
      .then(data => {
        if (data.Success) {
          dispatch(types.SET_DISPLAY_ORDER, data.Data)
        }
        return Promise.resolve(data)
      })
  },
  cancelOrder ({ dispatch }, token, id) {
    return orderApi.cancelOrder({ key: '307480468f2bb43dd01b190a169c8084547b4403', OrderId: id })
      .then(res => {
        if (res.Success) {
          return dispatch(types.CANCEL_ORDER, id)
        }
        return Promise.reject(res.Message)
      })
  },
  getPackageList ({ dispatch }, token) {
    return orderApi.getPackageList({ key: '307480468f2bb43dd01b190a169c8084547b4403', Type: 2 })
      .then(data => {
        if (data.Success) {
          dispatch(types.SET_PACKAGE_LIST, data.List)
        }
        return Promise.resolve(data)
      })
  },
  setStoreDetail ({ dispatch }, token, id) {
    return orderApi.getPackageDetail({
      key: '307480468f2bb43dd01b190a169c8084547b4403',
      PackageId: id
    })
      .then(data => {
        if (data.Success) {
          dispatch(types.SET_DISPLAY_PACKAGE, data.Data)
        }
        return Promise.resolve(data)
      })
  },
  getStoreDetail (token, id) {
    return orderApi.getPackageDetail({
      key: '307480468f2bb43dd01b190a169c8084547b4403',
      PackageId: id
    })
  },
  setPackageIds ({ dispatch }, ids) {
    return dispatch(types.SET_PACKAGE_IDS, ids)
  },
  setDefaultPid ({ dispatch }, id) {
    return dispatch(types.SET_DEFAULT_PID, id)
  },
  getPackageByShipId (token, id) {
    return orderApi.getPackageByShipId({
      key: '307480468f2bb43dd01b190a169c8084547b4403',
      ShippingCompanyId: id
    })
  },
  getPackageCount (token, id) {
    return orderApi.getPackageCount({
      key: '307480468f2bb43dd01b190a169c8084547b4403',
      ShippingCompanyId: id
    })
  },
  getPackageByIds (token, ids) {
    return orderApi.getPackageByIds({
      key: '307480468f2bb43dd01b190a169c8084547b4403',
      PackageIds: ids
    })
  },
  getShipWay (token, weight, id) {
    return orderApi.getShipWay({
      key: '307480468f2bb43dd01b190a169c8084547b4403',
      Weight: weight,
      ShippingCompanyId: id
    })
  },
  getShipService (token, id) {
    return orderApi.getShipService({
      key: '307480468f2bb43dd01b190a169c8084547b4403',
      ShippingCompanyId: id
    })
  },
  setShipWay ({ dispatch }, id) {
    dispatch(types.SET_SHIP_WAY, id)
  },
  setBox ({ dispatch }, box) {
    return dispatch(types.SET_SHIP_BOX, box)
  },
  addShipService ({ dispatch }, id) {
    dispatch(types.ADD_SHIP_SERVICE, id)
  },
  removeShipService ({ dispatch }, id) {
    dispatch(types.DEL_SHIP_SERVICE, id)
  },
  clearShipService ({ dispatch }) {
    return dispatch(types.CLEAR_SHIP_SERVICE)
  },
  saveTranOrder (order) {
    return orderApi.saveTranOrder(order)
  },
  getTranOrderList ({ dispatch }, token, page) {
    return orderApi.getTranOrderList({
      key: '307480468f2bb43dd01b190a169c8084547b4403',
      Page: page
    })
      .then(data => {
        if (data.Success) {
          dispatch(types.SET_TRAN_ORDER_LIST, data.List)
        }
        return Promise.resolve(data)
      })
  },
  getTransportDetail (token, id) {
    return orderApi.getTranOrderDetail({
      key: '307480468f2bb43dd01b190a169c8084547b4403',
      ShippingId: id
    })
  },
  setTransportDetail ({ dispatch }, order) {
    return dispatch(types.SET_TRAN_ORDER_DETAIL, order)
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
  },
  setDefaultAddress ({ dispatch }, address) {
    return dispatch(types.SET_DEFAULT_ADDRESS, address)
  },
  setSelectAddress ({ dispatch }, id) {
    return dispatch(types.SET_SELECT_ADDRESS, id)
  },
  getUserAddress (token) {
    return userApi.getUserAddress({ key: '307480468f2bb43dd01b190a169c8084547b4403' })
  },
  uploadIdCard (token, file) {
    return userApi.uploadIdCard({
      key: '307480468f2bb43dd01b190a169c8084547b4403',
      IdCartImage: file
    })
  },
  saveAddress (token, address) {
    return userApi.saveAddress({
      key: '307480468f2bb43dd01b190a169c8084547b4403',
      Address: address
    })
  },
  setPayOrder ({ dispatch }, pay) {
    return dispatch(types.SET_PAY_ORDER, pay)
  }
}

export {
  app,
  user,
  cart,
  orders
}
