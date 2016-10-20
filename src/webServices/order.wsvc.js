import api from '../webServices/api.wsvc'

export default {
  saveOrder: model => api.post('/order/save', model, true),
  getOrderList: model => api.post('/order/list', model, true),
  getOrderDetail: model => api.post('/order/detail', model, true),
  cancelOrder: model => api.post('/order/cancel', model, true),
  getPackageList: model => api.post('/package/list', model, true),
  getPackageDetail: model => api.post('/package/detail', model, true),
  getPackageByShipId: model => api.post('/package/list/company', model, true),
  getPackageCount: model => api.post('/package/count/company', model),
  getPackageByIds: model => api.post('/package/list/ids', model, true),
  getShipWay: model => api.post('/way/list', model, true),
  getShipService: model => api.post('/company/service', model, true),
  saveTranOrder: model => api.post('/shipping/create', model, true),
  getTranOrderList: model => api.post('/shipping/list', model, true),
  getTranOrderDetail: model => api.post('/shipping/detail', model, true),
  receiptGoods: model => api.post('/shipping/confirm', model, true),
  getExpressDetail: model => api.post('/catelog/express/details', model)
}
