import api from '../webServices/api.wsvc'

export default {
  getShopping: model => api.post('/product/detail', model, true),
  getCartCount: model => api.post('/cart/count', model),
  getShopRate: (model, domain) => api.post('/catelog/websites', {
    key: model,
    TopDomain: domain
  }),
  getCountryRate: model => api.post('/catelog/countries', { key: model }),
  addToCart: (model, shopping) => api.post('/cart/modify', {
    key: model,
    GrabAttr: shopping
  }, true),
  removeShopping: (model, id) => api.post('/cart/remove',
    {
      key: model,
      GrabAttributeId: id
    }, true),
  getCartList: model => api.post('/cart/list', { key: model }, true),
  getDefaultCompany: (model, countryIds) => api.post('/company/default', {
    key: model,
    CountryIds: countryIds
  }, true),
  getCompanyByCid: (model, countryId) => api.post('/company/shipcompanies', {
    key: model,
    CountryId: countryId
  }, true),
  getCompanyAndWay: (model, countryId) => api.post('/company/countryid', {
    key: model,
    CountryId: countryId
  }, true),
  getFaq: model => api.post('/catelog/question/answer', model)
}
