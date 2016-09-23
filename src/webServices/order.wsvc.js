import api from '../webServices/api.wsvc'

export default {
  saveOrder: model => api.post('/order/save', model),
  getOrderList: model => api.post('/order/list', model),
  getOrderDetail: model => api.post('/order/detail', model),
  cancelOrder: model => api.post('/order/cancel', model),
  getPackageList: model => api.post('/package/list', model),
  getPackageDetail: model => api.post('/package/detail', model),
  getPackageByShipId: model => api.post('/package/list/company', model),
  getShipWay: model => api.post('/way/list', model),
  getShipService: model => api.post('/company/service', model)
}

