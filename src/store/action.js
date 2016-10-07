import cartApi from '../webServices/cart.wsvc'
import appApi from '../webServices/app.wsvc'
import orderApi from '../webServices/order.wsvc'
import userApi from '../webServices/user.wsvc'
import * as types from './mutation-types'

const app = {
  setAppCurrency ({ dispatch }, token) {
    return appApi.getAppCurrency(token)
      .then(data => {
        if (data.Success) return dispatch(types.SET_APP_CURRENCY, data.Data)
        return Promise.reject(data.Message)
      })
  },
  getRegion () {
    return appApi.getRegion('region.txt')
  },
  genPay ({ dispatch }, toggle) {
    return dispatch(types.GEN_PAY, toggle)
  },
  setLoading ({ dispatch }, toggle) {
    return dispatch(types.SET_LOADING, toggle)
  },
  setSubmitLoading ({ dispatch }, toggle, msg) {
    return dispatch(types.SET_SUBMIT_LOADING, toggle, msg)
  },
  showAlert ({ dispatch }, msg, lazyFunc) {
    return dispatch(types.SHOW_ALERT, msg, lazyFunc)
  },
  showConfirm ({ dispatch }, data) {
    return dispatch(types.SHOW_CONFIRM, data)
  },
  hideConfirm ({ dispatch }) {
    return dispatch(types.HIDE_CONFIRM)
  }
}

const cart = {
  getShopping ({ dispatch }, token) {
    return cartApi.getShopping(token)
      .then(shopping => {
        dispatch(types.RECEIVE_SHOPPING_INFO, shopping.Data)
        return Promise.resolve(shopping)
      })
  },
  getExchangeRate (token, domain) {
    return cartApi.getShopRate(token, domain)
  },
  setShoppingRate ({ dispatch }, token, rateList) {
    return cartApi.getCountryRate(token)
      .then((res) => {
        dispatch(types.SAVE_SHOP_RATE, rateList)
        return dispatch(types.SAVE_COUNTRY_RATE, res.List)
      })
  },
  setCountryRate ({ dispatch }, token) {
    return cartApi.getCountryRate(token)
      .then((res) => dispatch(types.SAVE_COUNTRY_RATE, res.List))
  },
  initShoppingDisplay ({ dispatch }, detail) {
    dispatch(types.INIT_SHOPPING_DISPLAY, detail)
  },
  updateShoppingDisplay ({ dispatch }, detail) {
    dispatch(types.UPDATE_SHOPPING_DISPLAY, detail)
  },
  getCartList ({ dispatch }, token) {
    return cartApi.getCartList(token)
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
    return cartApi.addToCart(token, shopping)
  },
  removeShopping ({ dispatch }, token, id) {
    return cartApi.removeShopping(token, id)
      .then(res => {
        if (res.Success) {
          dispatch(types.REMOVE_SHOPPING_BY_ID, id)
          return Promise.resolve(res)
        }
        return Promise.reject(res.Message)
      })
  },
  getDefaultCompany ({ dispatch }, token, countryIds) {
    return cartApi.getDefaultCompany(token, countryIds)
      .then(res => {
        dispatch(types.SET_DEFAULT_COMPANY, res.List)
        return res.List
      })
  },
  getCompanyByCid (token, countryId) {
    return cartApi.getCompanyByCid(token, countryId)
  },
  setCompanyByCid ({ dispatch }, countryId, company) {
    dispatch(types.SET_COMPANY_BY_CID, countryId, company)
  },
  getFaq ({ dispatch }, token) {
    return cartApi.getFaq(token)
      .then(res => {
        if (res.Success) {
          dispatch(types.SET_FAQ, res.List)
        }
      })
  }
}

const orders = {
  saveOrder (order) {
    return orderApi.saveOrder(order)
  },
  getOrderList ({ dispatch }, token, page) {
    return orderApi.getOrderList({ key: token, Page: page })
      .then(data => {
        if (data.Success) {
          dispatch(types.SET_ORDER_LIST, data.List)
        }
        return Promise.resolve(data)
      })
  },
  getOrderDetail ({ dispatch }, token, id) {
    return orderApi.getOrderDetail({ key: token, OrderId: id })
      .then(data => {
        if (data.Success) {
          dispatch(types.SET_DISPLAY_ORDER, data.Data)
        }
        return Promise.resolve(data)
      })
  },
  cancelOrder ({ dispatch }, token, id) {
    return orderApi.cancelOrder({ key: token, OrderId: id })
      .then(res => {
        if (res.Success) {
          dispatch(types.CANCEL_ORDER, id)
          return Promise.resolve(res)
        }
        return Promise.reject(res.Message)
      })
  },
  getPackageList ({ dispatch }, token) {
    return orderApi.getPackageList({ key: token, Type: 2 })
      .then(data => {
        if (data.Success) {
          dispatch(types.SET_PACKAGE_LIST, data.List)
        }
        return Promise.resolve(data)
      })
  },
  setStoreDetail ({ dispatch }, token, id) {
    return orderApi.getPackageDetail({
      key: token,
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
      key: token,
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
      key: token,
      ShippingCompanyId: id
    })
  },
  getPackageCount (token, id) {
    return orderApi.getPackageCount({
      key: token,
      ShippingCompanyId: id
    })
  },
  getPackageByIds (token, ids) {
    return orderApi.getPackageByIds({
      key: token,
      PackageIds: ids
    })
  },
  getShipWay (token, weight, id) {
    return orderApi.getShipWay({
      key: token,
      Weight: weight,
      ShippingCompanyId: id
    })
  },
  getShipService (token, id) {
    return orderApi.getShipService({
      key: token,
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
      key: token,
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
      key: token,
      ShippingId: id
    })
  },
  setTransportDetail ({ dispatch }, order) {
    return dispatch(types.SET_TRAN_ORDER_DETAIL, order)
  }
}

const user = {
  getDefaultAddress ({ dispatch }, token) {
    return userApi.getDefaultAddress({ key: token })
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
    return userApi.getUserAddress({ key: token })
  },
  uploadIdCard (token, file) {
    return userApi.uploadIdCard({
      key: token,
      IdCartImage: file
    })
  },
  saveAddress (token, address) {
    return userApi.saveAddress({
      key: token,
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
