import api from '../webServices/cart.wsvc'
import * as types from './mutation-types'

const cart = {
  getShopping ({ dispatch }, token) {
    return api.getShopping('307480468f2bb43dd01b190a169c8084547b4403')
      .then(shopping => {
        dispatch(types.RECEIVE_SHOPPING_INFO, shopping.Data)
      })
  },
  getExchangeRate ({ dispatch }, token, domain) {
    return api.getShopRate('307480468f2bb43dd01b190a169c8084547b4403', domain)
      .then(rate => {
        if (rate.List.length > 0) {
          return Promise.resolve(rate)
        }
        else {
          return api.getCountryRate('307480468f2bb43dd01b190a169c8084547b4403')
        }
      }).then(rate => {
        return rate
      })
  },
  initShoppingDisplay ({ dispatch }, detail) {
    dispatch(types.INIT_SHOPPING_DISPLAY, detail)
  },
  updateShoppingDisplay ({ dispatch }, detail) {
    dispatch(types.UPDATE_SHOPPING_DISPLAY, detail)
  },
  getCartList ({ dispatch }, uid)  {
    /* dispatch(types.GET_CART_LIST, [{
     "Title": "taobao.com-黑人牙膏旗舰店",
     "StoreUrl": "https://item.taobao.com/item.htm?id=520655243307",
     "Rule": {
     "ExpensesType": 2,
     "LimitPrice": 49.0,
     "ExpensesPrice": 12.0,
     "CurrencySign": "$",
     "CurrencyCode": "USD"
     },
     "GrabAttrs": [{
     "IsBuy": false,
     "Coupon": null,
     "CountryId": 1,
     "WebSiteId": 1,
     "StoreLogo": null,
     "StoreName": null,
     "StoreUrl": null,
     "Cover": "http://img14.360buyimg.com/n5/jfs/t277/193/1005339798/768456/29136988/542d0798N19d42ce3.jpg",
     "Url": "https://item.taobao.com/item.htm?id=520655243307",
     "Brand": null,
     "CId": null,
     "OriginalUrl": null,
     "Name": "Apple iPhone 6 (A1586) 16GB 金色 移动联通电信4G手机",
     "Pictures": null,
     "Quantity": 10,
     "Sku": "20",
     "SkuId": "20",
     "ExpressFee": 7.0,
     "Height": 10,
     "Weight": 10,
     "Width": 10,
     "Length": 10,
     "UnitPrice": 10.0,
     "OriginalCurrencyCode": "USD",
     "OriginalCurrencySign": "$",
     "OriginalPrice": 50.0,
     "Note": "你好",
     "AttributeDescription": "描述",
     "OrderId": 0,
     "PackageId": 0,
     "ReplenishmentStatus": 0,
     "ReplenishmentStatusName": null,
     "ProductStautName": null,
     "ProductStauts": 0,
     "CurrencyCode": "CNY",
     "CurrencySign": "￥",
     "GrabAttributeNo": "N290965096012565",
     "IsSensitive": false,
     "Operation": 0,
     "Price": 11.0,
     "Rate": 6.4,
     "ExpressNumber": null,
     "ExpressCompanyName": null,
     "PackageNo": null,
     "Id": 1,
     "CreateTime": "2016-09-08T11:38:55.4043068+08:00",
     "UpdateTime": "2016-09-08T11:38:55.4043068+08:00"
     }, {
     "IsBuy": false,
     "Coupon": null,
     "CountryId": 1,
     "WebSiteId": 0,
     "StoreLogo": null,
     "StoreName": null,
     "StoreUrl": null,
     "Cover": "http://img14.360buyimg.com/n5/jfs/t277/193/1005339798/768456/29136988/542d0798N19d42ce3.jpg",
     "Url": "https://item.taobao.com/item.htm?id=520655243307",
     "Brand": null,
     "CId": null,
     "OriginalUrl": null,
     "Name": "Apple iPhone 6 (A1586) 16GB 金色 移动联通电信4G手机",
     "Pictures": null,
     "Quantity": 10,
     "Sku": "20",
     "SkuId": "20",
     "ExpressFee": 7.0,
     "Height": 0,
     "Weight": 0,
     "Width": 0,
     "Length": 0,
     "UnitPrice": 0.0,
     "OriginalCurrencyCode": null,
     "OriginalCurrencySign": null,
     "OriginalPrice": 50.0,
     "Note": "你好",
     "AttributeDescription": null,
     "OrderId": 0,
     "PackageId": 0,
     "ReplenishmentStatus": 0,
     "ReplenishmentStatusName": null,
     "ProductStautName": null,
     "ProductStauts": 0,
     "CurrencyCode": null,
     "CurrencySign": null,
     "GrabAttributeNo": "N290965096012565",
     "IsSensitive": false,
     "Operation": 0,
     "Price": 20.0,
     "Rate": 0.0,
     "ExpressNumber": null,
     "ExpressCompanyName": null,
     "PackageNo": null,
     "Id": 2,
     "CreateTime": "1970-01-01T00:00:00",
     "UpdateTime": "1970-01-01T00:00:00"
     }]
     }, {
     "Title": "taobao.com-黑人牙膏旗舰店",
     "StoreUrl": "https://item.taobao.com/item.htm?id=520655243307",
     "Rule": {
     "ExpensesType": 2,
     "LimitPrice": 49.0,
     "ExpensesPrice": 12.0,
     "CurrencySign": "$",
     "CurrencyCode": "USD"
     },
     "GrabAttrs": [{
     "IsBuy": false,
     "Coupon": null,
     "CountryId": 1,
     "WebSiteId": 1,
     "StoreLogo": null,
     "StoreName": null,
     "StoreUrl": null,
     "Cover": "http://img14.360buyimg.com/n5/jfs/t277/193/1005339798/768456/29136988/542d0798N19d42ce3.jpg",
     "Url": "https://item.taobao.com/item.htm?id=520655243307",
     "Brand": null,
     "CId": null,
     "OriginalUrl": null,
     "Name": "Apple iPhone 6 (A1586) 16GB 金色 移动联通电信4G手机",
     "Pictures": null,
     "Quantity": 10,
     "Sku": "20",
     "SkuId": "20",
     "ExpressFee": 7.0,
     "Height": 10,
     "Weight": 10,
     "Width": 10,
     "Length": 10,
     "UnitPrice": 10.0,
     "OriginalCurrencyCode": "USD",
     "OriginalCurrencySign": "$",
     "OriginalPrice": 50.0,
     "Note": "你好",
     "AttributeDescription": "描述",
     "OrderId": 0,
     "PackageId": 0,
     "ReplenishmentStatus": 0,
     "ReplenishmentStatusName": null,
     "ProductStautName": null,
     "ProductStauts": 0,
     "CurrencyCode": "CNY",
     "CurrencySign": "￥",
     "GrabAttributeNo": "N290965096012565",
     "IsSensitive": false,
     "Operation": 0,
     "Price": 13.0,
     "Rate": 6.4,
     "ExpressNumber": null,
     "ExpressCompanyName": null,
     "PackageNo": null,
     "Id": 3,
     "CreateTime": "2016-09-08T11:38:55.4043068+08:00",
     "UpdateTime": "2016-09-08T11:38:55.4043068+08:00"
     }, {
     "IsBuy": false,
     "Coupon": null,
     "CountryId": 1,
     "WebSiteId": 0,
     "StoreLogo": null,
     "StoreName": null,
     "StoreUrl": null,
     "Cover": "http://img14.360buyimg.com/n5/jfs/t277/193/1005339798/768456/29136988/542d0798N19d42ce3.jpg",
     "Url": "https://item.taobao.com/item.htm?id=520655243307",
     "Brand": null,
     "CId": null,
     "OriginalUrl": null,
     "Name": "Apple iPhone 6 (A1586) 16GB 金色 移动联通电信4G手机",
     "Pictures": null,
     "Quantity": 10,
     "Sku": "20",
     "SkuId": "20",
     "ExpressFee": 7.0,
     "Height": 0,
     "Weight": 0,
     "Width": 0,
     "Length": 0,
     "UnitPrice": 0.0,
     "OriginalCurrencyCode": null,
     "OriginalCurrencySign": null,
     "OriginalPrice": 50.0,
     "Note": "你好",
     "AttributeDescription": null,
     "OrderId": 0,
     "PackageId": 0,
     "ReplenishmentStatus": 0,
     "ReplenishmentStatusName": null,
     "ProductStautName": null,
     "ProductStauts": 0,
     "CurrencyCode": null,
     "CurrencySign": null,
     "GrabAttributeNo": "N290965096012565",
     "IsSensitive": false,
     "Operation": 0,
     "Price": 12.5,
     "Rate": 0.0,
     "ExpressNumber": null,
     "ExpressCompanyName": null,
     "PackageNo": null,
     "Id": 4,
     "CreateTime": "1970-01-01T00:00:00",
     "UpdateTime": "1970-01-01T00:00:00"
     }]
     }])*/
    return api.getCartList('307480468f2bb43dd01b190a169c8084547b4403')
      .then(cart => {
        dispatch(types.GET_CART_LIST, cart.List)
      })
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
    debugger
    return api.addToCart('307480468f2bb43dd01b190a169c8084547b4403', shopping)
      .then(res => {
        debugger
      })
  }
}

/*  api.getShopping(model).then(shopping => {
 dispatch(types.RECEIVE_SHOPPING_INFO, shopping)
 })*/

const orders = {}

export {
  cart,
  orders
}
