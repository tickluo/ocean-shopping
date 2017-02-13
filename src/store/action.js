import cartApi from '../webServices/cart.wsvc'
import appApi from '../webServices/app.wsvc'
import orderApi from '../webServices/order.wsvc'
import userApi from '../webServices/user.wsvc'
import * as types from './mutation-types'
import { PageSize } from '../local/config.enum'

const app = {
  setAppCurrency ({ dispatch }) {
    return appApi.getAppCurrency()
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
  getShopping (url) {
    return cartApi.getShopping({ Url: url })
    /* .then(shopping => {
     dispatch(types.RECEIVE_SHOPPING_INFO, shopping.Data)
     return Promise.resolve(shopping)
     })*/
  },
  setShopping ({ dispatch }, shopping) {
    return dispatch(types.RECEIVE_SHOPPING_INFO, shopping)
  },
  getCartCount () {
    return cartApi.getCartCount()
  },
  getExchangeRate (domain) {
    return cartApi.getShopRate({ TopDomain: domain })
  },
  setShoppingRate ({ dispatch }, rateList) {
    return cartApi.getCountryRate()
      .then((res) => {
        dispatch(types.SAVE_SHOP_RATE, rateList)
        return dispatch(types.SAVE_COUNTRY_RATE, res.List)
      })
  },
  setCountryRate ({ dispatch }) {
    return cartApi.getCountryRate()
      .then((res) => {
        dispatch(types.SAVE_COUNTRY_RATE, res.List)
        return Promise.resolve(res)
      })
  },
  initShoppingDisplay ({ dispatch }, detail) {
    dispatch(types.INIT_SHOPPING_DISPLAY, detail)
  },
  updateShoppingDisplay ({ dispatch }, detail) {
    dispatch(types.UPDATE_SHOPPING_DISPLAY, detail)
  },
  getCartList ({ dispatch }) {
    return cartApi.getCartList()
      .then(cartInfo => {
        dispatch(types.GET_CART_LIST, cartInfo.List)
        return cartInfo
      })
  },
  selectAll ({ dispatch }, toggle, rate) {
    dispatch(types.SELECT_ALL_SHOPPING, toggle, rate)
  },
  selectShop ({ dispatch }, toggle, shopId, rate) {
    dispatch(types.SELECT_SHOP_SHOPPING, toggle, shopId, rate)
  },
  selectShopping ({ dispatch }, toggle, shopId, id, rate) {
    dispatch(types.SELECT_SHOPPING, toggle, shopId, id, rate)
  },
  addShoppingCount ({ dispatch }) {
    dispatch(types.INCREASE_SHOPPING_COUNT)
  },
  reduceShoppingCount ({ dispatch }) {
    dispatch(types.DECREASE_SHOPPING_COUNT)
  },
  addToCart (shopping) {
    return cartApi.addToCart({ GrabAttr: shopping })
  },
  clearRemoveList ({ dispatch }) {
    dispatch(types.CLEAR_REMOVE_LIST)
  },
  removeShopping ({ dispatch }, id) {
    return cartApi.removeShopping({ GrabAttributeId: id })
      .then(res => {
        if (res.Success) {
          dispatch(types.REMOVE_SHOPPING_BY_ID, id)
          return Promise.resolve(res)
        }
        return Promise.reject(res.Message)
      })
  },
  addToNoCount ({ dispatch }, id) {
    dispatch(types.ADD_NO_COUNT_SHOPPING, id)
  },
  removeFromNoCount ({ dispatch }, id) {
    dispatch(types.REMOVE_NO_COUNT_SHOPPING, id)
  },
  clearNoCountList ({ dispatch }) {
    dispatch(types.CLEAR_NO_COUNT_SHOPPING)
  },
  getDefaultCompany ({ dispatch }, countryIds) {
    return cartApi.getDefaultCompany({ CountryIds: countryIds })
      .then(res => {
        dispatch(types.SET_DEFAULT_COMPANY, res.List)
        return res.List
      })
  },
  getCompanyByCid (countryId) {
    return cartApi.getCompanyByCid({ CountryId: countryId })
  },
  setCompanyByCid ({ dispatch }, countryId, company) {
    dispatch(types.SET_COMPANY_BY_CID, countryId, company)
  },
  getCompanyAndWay (countryId) {
    return cartApi.getCompanyAndWay({ CountryId: countryId })
  },
  setCompanyAndWay ({ dispatch }, countryId, company) {
    dispatch(types.SET_COMPANY_AND_WAY, countryId, company)
  },
  getFaq ({ dispatch }, index) {
    return cartApi.getFaq({
      Page: { PageIndex: index, PageSize }
    })
      .then(res => {
        if (res.Success) {
          dispatch(types.SET_FAQ, res.List, index)
        }
        return Promise.resolve(res)
      })
  },
  setFaqIndex ({ dispatch }, index) {
    return dispatch(types.SET_FAQ_INDEX, index)
  },
  setFaqLoaded ({ dispatch }, isLoaded) {
    return dispatch(types.SET_FAQ_LOADED, isLoaded)
  }
}

const orders = {
  saveOrder (order) {
    return orderApi.saveOrder(order)
  },
  getOrderList ({ dispatch }, index) {
    return orderApi.getOrderList({ Page: { PageIndex: index, PageSize }})
      .then(data => {
        if (data.Success) {
          dispatch(types.SET_ORDER_LIST, data.List, index)
        }
        return Promise.resolve(data)
      })
  },
  getOrderDetail ({ dispatch }, id) {
    return orderApi.getOrderDetail({ OrderId: id })
      .then(data => {
        if (data.Success) {
          dispatch(types.SET_DISPLAY_ORDER, data.Data)
        }
        return Promise.resolve(data)
      })
  },
  cancelOrder ({ dispatch }, id) {
    return orderApi.cancelOrder({ OrderId: id })
      .then(res => {
        if (res.Success) {
          dispatch(types.CANCEL_ORDER, id)
          return Promise.resolve(res)
        }
        return Promise.reject(res.Message)
      })
  },
  deleteOrder ({ dispatch }, id) {
    return orderApi.deleteOrder({ OrderId: id })
      .then(res => {
        if (res.Success) {
          dispatch(types.DELETE_ORDER, id)
          return Promise.resolve(res)
        }
        return Promise.reject(res.Message)
      })
  },
  getPackageList ({ dispatch }) {
    return orderApi.getPackageList({ Type: 2 })
      .then(data => {
        if (data.Success) {
          dispatch(types.SET_PACKAGE_LIST, data.List)
        }
        return Promise.resolve(data)
      })
  },
  setStoreDetail ({ dispatch }, id) {
    return orderApi.getPackageDetail({
      PackageId: id
    })
      .then(data => {
        if (data.Success) {
          dispatch(types.SET_DISPLAY_PACKAGE, data.Data)
        }
        return Promise.resolve(data)
      })
  },
  getStoreDetail (id) {
    return orderApi.getPackageDetail({
      PackageId: id
    })
  },
  setPackageIds ({ dispatch }, ids) {
    return dispatch(types.SET_PACKAGE_IDS, ids)
  },
  setDefaultPid ({ dispatch }, id) {
    return dispatch(types.SET_DEFAULT_PID, id)
  },
  getPackageByShipId (id) {
    return orderApi.getPackageByShipId({
      ShippingCompanyId: id
    })
  },
  getPackageCount (id) {
    return orderApi.getPackageCount({
      ShippingCompanyId: id
    })
  },
  getPackageByIds (ids) {
    return orderApi.getPackageByIds({
      PackageIds: ids
    })
  },
  getShipWay (weight, id) {
    return orderApi.getShipWay({
      Weight: weight,
      ShippingCompanyId: id
    })
  },
  getShipService (id) {
    return orderApi.getShipService({
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
  receiptGoods ({ dispatch }, id) {
    return orderApi.receiptGoods({ ShippingId: id })
      .then(res => {
        if (res.Success) {
          dispatch(types.RECEIPT_GOODS, id)
          return Promise.resolve(res)
        }
        return Promise.reject(res.Message)
      })
  },
  getTranOrderList ({ dispatch }, index) {
    return orderApi.getTranOrderList({ Page: { PageIndex: index, PageSize }})
      .then(data => {
        if (data.Success) {
          dispatch(types.SET_TRAN_ORDER_LIST, data.List, index)
        }
        return Promise.resolve(data)
      })
  },
  getTransportDetail (id) {
    return orderApi.getTranOrderDetail({
      ShippingId: id
    })
  },
  setTransportDetail ({ dispatch }, order) {
    return dispatch(types.SET_TRAN_ORDER_DETAIL, order)
  },
  getExpressDetail (code, expressNo) {
    return orderApi.getExpressDetail({
      Code: code,
      ExpressNo: expressNo
    })
  },
  setExpressDetail ({ dispatch }, detail) {
    return dispatch(types.SET_EXPRESS_DETAIL, detail)
  },
  setExpressSite ({ dispatch }, express) {
    return dispatch(types.SET_EXPRESS_SITE, express)
  }
}

const user = {
  getDefaultAddress ({ dispatch }) {
    return userApi.getDefaultAddress()
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
  setModifyAddress ({ dispatch }, address) {
    return dispatch(types.SET_MODIFY_ADDRESS, address)
  },
  setSelectAddress ({ dispatch }, id) {
    return dispatch(types.SET_SELECT_ADDRESS, id)
  },
  getUserAddress () {
    return userApi.getUserAddress()
  },
  uploadIdCard (file) {
    return userApi.uploadIdCard({
      IdCartImage: file
    })
  },
  saveAddress (address) {
    return userApi.saveAddress({ Address: address })
  },
  deleteAddress (addressId, setId) {
    return userApi.deleteAddress({
      AddressId: addressId,
      SetId: setId
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
