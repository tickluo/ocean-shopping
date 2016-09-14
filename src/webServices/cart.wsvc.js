import api from '../webServices/api.wsvc'

export default {
  getShopping: model => api.post('/product/detail', { key: model }),
  getShopRate: (model, domain) => api.post('/catelog/websites', { key: model, TopDomain: domain }),
  getCountryRate: model => api.post('/catelog/countries', { key: model }),
  addToCart: (model, shopping) => api.post('/cart/modify', { key: model, GrabAttr: shopping }),
  removeShopping: (model, id) => api.post('/cart/remove', { key: model, GrabAttributeId: id }),
  getCartList: model => api.post('/cart/list', { key: model }),
  getDefaultCompany: (model, countryIds) => api.post('/company/default', {
    key: model,
    CountryIds: countryIds
  }),
  getCompanyByCid: (model, countryId) => api.post('/company/shipcompanies', {
    key: model,
    CountryId: countryId
  })
}
