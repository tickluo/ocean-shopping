import cartApi from '../webServices/cart.wsvc'
import appApi from '../webServices/app.wsvc'
import orderApi from '../webServices/order.wsvc'
import userApi from '../webServices/user.wsvc'
import * as types from './mutation-types'

/* const localRegion = require('../asset/json/region.txt')*/

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
    /* return cartApi.getCountryRate(token)
      .then((res) => {
        dispatch(types.SAVE_SHOP_RATE, rateList)
        return dispatch(types.SAVE_COUNTRY_RATE, res.List)
      })*/
    dispatch(types.SAVE_SHOP_RATE, [{"WebSiteName":"Finish Line","WebSiteId":1,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":7.0729,"RateDescription":"「美私转运」+美国信用卡下单，因此汇率略高","Url":"finishline.com"},{"WebSiteName":"Joe's NB Outlet","WebSiteId":2,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8035,"RateDescription":"","Url":"joesnewbalanceoutlet.com"},{"WebSiteName":"拉夫劳伦官网","WebSiteId":3,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8060,"RateDescription":"","Url":"ralphlauren.com"},{"WebSiteName":"Neiman Marcus","WebSiteId":4,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8060,"RateDescription":"","Url":"neimanmarcus.com"},{"WebSiteName":"楽天市場","WebSiteId":5,"CountryId":1,"CurrencySign":"￥","CurrencyCode":"JPY","Rate":0.0670,"RateDescription":"","Url":"rakuten.co.jp"},{"WebSiteName":"eBay","WebSiteId":6,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8060,"RateDescription":"","Url":"ebay.com"},{"WebSiteName":"雅诗兰黛官网","WebSiteId":7,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8035,"RateDescription":"","Url":"esteelauder.com"},{"WebSiteName":"日本亚马逊","WebSiteId":8,"CountryId":1,"CurrencySign":"￥","CurrencyCode":"JPY","Rate":0.0675,"RateDescription":"","Url":"amazon.co.jp"},{"WebSiteName":"美国亚马逊","WebSiteId":9,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8060,"RateDescription":"","Url":"amazon.com"},{"WebSiteName":"GNC 官网","WebSiteId":11,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8060,"RateDescription":"","Url":"gnc.com"},{"WebSiteName":"iHerb","WebSiteId":12,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8035,"RateDescription":"","Url":"iherb.com"},{"WebSiteName":"6PM","WebSiteId":14,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8035,"RateDescription":"","Url":"6pm.com"},{"WebSiteName":"Beauty.com","WebSiteId":15,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8035,"RateDescription":"","Url":"beauty.com"},{"WebSiteName":"Drugstore","WebSiteId":16,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8035,"RateDescription":"","Url":"drugstore.com"},{"WebSiteName":"REI","WebSiteId":17,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8060,"RateDescription":"","Url":"rei.com"},{"WebSiteName":"Ashford","WebSiteId":18,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8060,"RateDescription":"","Url":"ashford.com"},{"WebSiteName":"Levi's 官网","WebSiteId":19,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8060,"RateDescription":"","Url":"levi.com"},{"WebSiteName":"Juicy Couture","WebSiteId":20,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8035,"RateDescription":"","Url":"juicycouture.com"},{"WebSiteName":"施华洛世奇官网","WebSiteId":21,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8035,"RateDescription":"","Url":"swarovski.com"},{"WebSiteName":"Bloomingdale's","WebSiteId":22,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":7.0729,"RateDescription":"「美私转运」+美国信用卡下单，因此汇率略高","Url":"bloomingdales.com"},{"WebSiteName":"Timberland 官网","WebSiteId":23,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":7.0703,"RateDescription":"「美私转运」+美国信用卡下单，因此汇率略高","Url":"timberland.com"},{"WebSiteName":"Origins 官网","WebSiteId":24,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8035,"RateDescription":"","Url":"origins.com"},{"WebSiteName":"Saks Fifth Avenue","WebSiteId":25,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8060,"RateDescription":"","Url":"saksfifthavenue.com"},{"WebSiteName":"JOMASHOP","WebSiteId":26,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8035,"RateDescription":"","Url":"jomashop.com"},{"WebSiteName":"ThinkGeek","WebSiteId":27,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8060,"RateDescription":"","Url":"thinkgeek.com"},{"WebSiteName":"城野医生官网","WebSiteId":28,"CountryId":1,"CurrencySign":"￥","CurrencyCode":"JPY","Rate":0.0676,"RateDescription":"","Url":"ci-labo.com"},{"WebSiteName":"维多利亚的秘密","WebSiteId":29,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8035,"RateDescription":"","Url":"victoriassecret.com"},{"WebSiteName":"德国亚马逊","WebSiteId":30,"CountryId":4,"CurrencySign":"€","CurrencyCode":"EUR","Rate":7.6360,"RateDescription":"","Url":"amazon.de"},{"WebSiteName":"美国新蛋","WebSiteId":31,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":7.0729,"RateDescription":"「美私转运」+美国信用卡下单，因此汇率略高","Url":"newegg.com"},{"WebSiteName":"法国亚马逊","WebSiteId":32,"CountryId":4,"CurrencySign":"€","CurrencyCode":"EUR","Rate":7.6360,"RateDescription":"","Url":"amazon.fr"},{"WebSiteName":"英国亚马逊","WebSiteId":33,"CountryId":5,"CurrencySign":"￡","CurrencyCode":"GBP","Rate":8.8354,"RateDescription":"","Url":"amazon.co.uk"},{"WebSiteName":"戴尔美国官网","WebSiteId":34,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":7.0703,"RateDescription":"「美私转运」+美国信用卡下单，因此汇率略高","Url":"dell.com"},{"WebSiteName":"MUJI日本官网","WebSiteId":35,"CountryId":1,"CurrencySign":"￥","CurrencyCode":"JPY","Rate":0.0670,"RateDescription":"","Url":"muji.net"},{"WebSiteName":"耐克美国官网","WebSiteId":36,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":7.0729,"RateDescription":"「美私转运」+美国信用卡下单，因此汇率略高","Url":"nike.com"},{"WebSiteName":"STP","WebSiteId":37,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8035,"RateDescription":"商家运费取决于订单金额，多退少补","Url":"sierratradingpost.com"},{"WebSiteName":"NordStrom","WebSiteId":38,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8035,"RateDescription":"","Url":"nordstrom.com"},{"WebSiteName":"Saks Off 5th","WebSiteId":39,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8060,"RateDescription":"","Url":"saksoff5th.com"},{"WebSiteName":"Last Call","WebSiteId":40,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8035,"RateDescription":"","Url":"lastcall.com"},{"WebSiteName":"Bergdorf Goodman","WebSiteId":41,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8035,"RateDescription":"","Url":"bergdorfgoodman.com"},{"WebSiteName":"ASOS","WebSiteId":42,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8060,"RateDescription":"","Url":"asos.com"},{"WebSiteName":"Ann Taylor","WebSiteId":43,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8035,"RateDescription":"","Url":"anntaylor.com"},{"WebSiteName":"Zara","WebSiteId":44,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8035,"RateDescription":"","Url":"zarahome.com"},{"WebSiteName":"SHOPBOP","WebSiteId":45,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8035,"RateDescription":"","Url":"shopbop.com"},{"WebSiteName":"Macy's","WebSiteId":46,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8035,"RateDescription":"","Url":"macys.com"},{"WebSiteName":"Lord & Taylor","WebSiteId":47,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8035,"RateDescription":"","Url":"lordandtaylor.com"},{"WebSiteName":"CUSP","WebSiteId":48,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8035,"RateDescription":"","Url":"cusp.com"},{"WebSiteName":"Barneys Warehouse","WebSiteId":49,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8035,"RateDescription":"","Url":"barneyswarehouse.com"},{"WebSiteName":"Nordstrom Rack","WebSiteId":50,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8060,"RateDescription":"","Url":"nordstromrack.com"},{"WebSiteName":"Gilt","WebSiteId":51,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8035,"RateDescription":"","Url":"gilt.com"},{"WebSiteName":"LOFT","WebSiteId":52,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8035,"RateDescription":"","Url":"loft.com"},{"WebSiteName":"BCBG","WebSiteId":53,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8035,"RateDescription":"","Url":"bcbg.com"},{"WebSiteName":"Banana Republic","WebSiteId":54,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8035,"RateDescription":"","Url":"bananarepublic.com"},{"WebSiteName":"Club Monaco","WebSiteId":55,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8035,"RateDescription":"","Url":"clubmonaco.com"},{"WebSiteName":"J.Crew","WebSiteId":56,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8060,"RateDescription":"","Url":"jcrew.com"},{"WebSiteName":"Tommy Hilfiger","WebSiteId":57,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8035,"RateDescription":"","Url":"tommy.com"},{"WebSiteName":"YOOX","WebSiteId":58,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8035,"RateDescription":"","Url":"yoox.com"},{"WebSiteName":"THE OUTNET","WebSiteId":59,"CountryId":2,"CurrencySign":"$","CurrencyCode":"USD","Rate":6.8035,"RateDescription":"","Url":"theoutnet.com"}])
    dispatch(types.SAVE_COUNTRY_RATE, [{"Name":"美国","CurrencySign":"$","CurrencyCode":"USD","Rate":6.8695,"Id":2,"CreateTime":"2015-12-23 19:43:10","UpdateTime":"2015-12-25 14:44:35"},{"Name":"日本","CurrencySign":"￥","CurrencyCode":"JPY","Rate":0.0677,"Id":1,"CreateTime":"2015-12-23 19:44:56","UpdateTime":"2016-02-19 19:36:39"},{"Name":"欧洲","CurrencySign":"€","CurrencyCode":"EUR","Rate":7.7118,"Id":4,"CreateTime":"2016-06-17 18:21:44","UpdateTime":"2016-06-17 18:21:44"},{"Name":"英国","CurrencySign":"£","CurrencyCode":"GBP","Rate":8.9351,"Id":5,"CreateTime":"2016-06-23 15:46:12","UpdateTime":"2016-06-23 15:46:25"}])
    return Promise.resolve()
  },
  setCountryRate ({ dispatch }, token) {
    /* return cartApi.getCountryRate(token)
      .then((res) => dispatch(types.SAVE_COUNTRY_RATE, res.List))*/
    dispatch(types.SAVE_COUNTRY_RATE, [{"Name":"美国","CurrencySign":"$","CurrencyCode":"USD","Rate":6.8695,"Id":2,"CreateTime":"2015-12-23 19:43:10","UpdateTime":"2015-12-25 14:44:35"},{"Name":"日本","CurrencySign":"￥","CurrencyCode":"JPY","Rate":0.0677,"Id":1,"CreateTime":"2015-12-23 19:44:56","UpdateTime":"2016-02-19 19:36:39"},{"Name":"欧洲","CurrencySign":"€","CurrencyCode":"EUR","Rate":7.7118,"Id":4,"CreateTime":"2016-06-17 18:21:44","UpdateTime":"2016-06-17 18:21:44"},{"Name":"英国","CurrencySign":"£","CurrencyCode":"GBP","Rate":8.9351,"Id":5,"CreateTime":"2016-06-23 15:46:12","UpdateTime":"2016-06-23 15:46:25"}])
    return Promise.resolve()
  },
  initShoppingDisplay ({ dispatch }, detail) {
    dispatch(types.INIT_SHOPPING_DISPLAY, detail)
  },
  updateShoppingDisplay ({ dispatch }, detail) {
    dispatch(types.UPDATE_SHOPPING_DISPLAY, detail)
  },
  getCartList ({ dispatch }, token) {
    /* return cartApi.getCartList(token)
     .then(cartInfo => dispatch(types.GET_CART_LIST, cartInfo.List))*/
    dispatch(types.GET_CART_LIST,[
      {"Title":"nike.com-耐克美国官网","StoreUrl":"http://www.nike.com","Rule":{"ExpensesType":4,"LimitPrice":180.00,"ExpensesPrice":8.00,"CurrencySign":"$","CurrencyCode":"USD"},
        "GrabAttrs":[
          {"CountryId":2,"WebSiteId":36,"StoreLogo":"http://www.muji.com/img/logo_muji_b.png","StoreName":"耐克美国官网","StoreUrl":"http://www.nike.com","Cover":"http://images.nike.com/is/image/DotCom/PDP_COPY/468963_355/new-york-jets-brandon-marshall-mens-football-home.jpg","Url":"http://store.nike.com/us/en_us/pd/new-york-jets-brandon-marshall-mens-football-home/pid-10341869/pgid-11456985","Brand":"","CId":"","OriginalUrl":"","RebateUrl":"http://store.nike.com/us/en_us/pd/new-york-jets-brandon-marshall-mens-football-home/pid-10341869/pgid-11456985","Name":"NFL New York Jets (Brandon Marshall) Men's Football Home Game Jersey","Pictures":"http://images.nike.com/is/image/DotCom/PDP_COPY/468963_355/new-york-jets-brandon-marshall-mens-football-home.jpg","Quantity":1,"Sku":"Size:S","SkuId":"11877160","ExpressFee":0.00,"Height":0,"Weight":0,"Width":0,"Length":0,"UnitPrice":0.00,"OriginalCurrencyCode":"USD","OriginalCurrencySign":"$","OriginalPrice":100.00,"Note":"","AttributeDescription":"","ReplenishmentStatus":0,"ProductStauts":1,"CurrencyCode":"","CurrencySign":"","GrabAttributeNo":"981475167793374812","Price":0.00,"IsBuy":true,"Coupon":"","Id":70953,"CreateTime":"2016-09-29 16:49:53","UpdateTime":"2016-09-29 18:17:57"},
          {"CountryId":2,"WebSiteId":36,"StoreLogo":"http://www.muji.com/img/logo_muji_b.png","StoreName":"耐克美国官网","StoreUrl":"http://www.nike.com","Cover":"http://images.nike.com/is/image/DotCom/PDP_COPY/468963_355/new-york-jets-brandon-marshall-mens-football-home.jpg","Url":"http://store.nike.com/us/en_us/pd/new-york-jets-brandon-marshall-mens-football-home/pid-10341869/pgid-11456985","Brand":"","CId":"","OriginalUrl":"","RebateUrl":"http://store.nike.com/us/en_us/pd/new-york-jets-brandon-marshall-mens-football-home/pid-10341869/pgid-11456985","Name":"NFL New York Jets (Brandon Marshall) Men's Football Home Game Jersey","Pictures":"http://images.nike.com/is/image/DotCom/PDP_COPY/468963_355/new-york-jets-brandon-marshall-mens-football-home.jpg","Quantity":1,"Sku":"Size:S","SkuId":"11877160","ExpressFee":0.00,"Height":0,"Weight":0,"Width":0,"Length":0,"UnitPrice":0.00,"OriginalCurrencyCode":"USD","OriginalCurrencySign":"$","OriginalPrice":100.00,"Note":"","AttributeDescription":"","ReplenishmentStatus":0,"ProductStauts":1,"CurrencyCode":"","CurrencySign":"","GrabAttributeNo":"981475167793374812","Price":0.00,"IsBuy":true,"Coupon":"","Id":70954,"CreateTime":"2016-09-29 16:49:53","UpdateTime":"2016-09-29 18:17:57"},
          {"CountryId":2,"WebSiteId":36,"StoreLogo":"http://www.muji.com/img/logo_muji_b.png","StoreName":"耐克美国官网","StoreUrl":"http://www.nike.com","Cover":"http://images.nike.com/is/image/DotCom/PDP_COPY/468963_355/new-york-jets-brandon-marshall-mens-football-home.jpg","Url":"http://store.nike.com/us/en_us/pd/new-york-jets-brandon-marshall-mens-football-home/pid-10341869/pgid-11456985","Brand":"","CId":"","OriginalUrl":"","RebateUrl":"http://store.nike.com/us/en_us/pd/new-york-jets-brandon-marshall-mens-football-home/pid-10341869/pgid-11456985","Name":"NFL New York Jets (Brandon Marshall) Men's Football Home Game Jersey","Pictures":"http://images.nike.com/is/image/DotCom/PDP_COPY/468963_355/new-york-jets-brandon-marshall-mens-football-home.jpg","Quantity":1,"Sku":"Size:S","SkuId":"11877160","ExpressFee":0.00,"Height":0,"Weight":0,"Width":0,"Length":0,"UnitPrice":0.00,"OriginalCurrencyCode":"USD","OriginalCurrencySign":"$","OriginalPrice":100.00,"Note":"","AttributeDescription":"","ReplenishmentStatus":0,"ProductStauts":1,"CurrencyCode":"","CurrencySign":"","GrabAttributeNo":"981475167793374812","Price":0.00,"IsBuy":true,"Coupon":"","Id":70955,"CreateTime":"2016-09-29 16:49:53","UpdateTime":"2016-09-29 18:17:57"}
        ]}
    ])
    return Promise.resolve()
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
  removeShopping ({ dispatch }, token, shopId, id) {
    return cartApi.removeShopping(token, id)
      .then(res => {
        if (res.Success) {
          dispatch(types.REMOVE_SHOPPING_BY_ID, shopId, id)
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
