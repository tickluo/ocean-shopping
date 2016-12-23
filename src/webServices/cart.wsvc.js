import api from '../webServices/api.wsvc'

export default {
  getShopping: model => api.post('/product/detail', model),
  getCartCount: model => api.post('/cart/count', model),
  getShopRate: model => api.post('/catelog/websites', model),
  getCountryRate: model => api.post('/catelog/countries', model),
  addToCart: model => api.post('/cart/modify', model),
  removeShopping: model => api.post('/cart/remove', model),
  getCartList: model => api.post('/cart/list', model),
  getDefaultCompany: model => api.post('/company/default', model),
  getCompanyByCid: model => api.post('/company/shipcompanies', model),
  getCompanyAndWay: model => api.post('/company/countryid', model),
  getFaq: model => api.post('/catelog/question/answer', model)
}
