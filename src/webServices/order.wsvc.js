import api from '../webServices/api.wsvc'

export default {
  saveOrder: model => api.post('/order/save', model),
  getOrderList: model => api.post('/order/list', model),
  getOrderDetail: model => api.post('/order/detail', model),
  cancelOrder: model => api.post('/order/cancel', model),
  deleteOrder: model => api.post('/order/delete', model),
  getPackageList: model => api.post('/package/list', model),
  getPackageDetail: model => api.post('/package/detail', model),
  getPackageByShipId: model => api.post('/package/list/company', model),
  getPackageCount: model => api.post('/package/count/company', model),
  getPackageByIds: model => api.post('/package/list/ids', model),
  getShipWay: model => api.post('/way/list', model),
  getShipService: model => api.post('/company/service', model),
  saveTranOrder: model => api.post('/shipping/create', model),
  getTranOrderList: model => api.post('/shipping/list', model),
  getTranOrderDetail: model => api.post('/shipping/detail', model),
  receiptGoods: model => api.post('/shipping/confirm', model),
  getExpressDetail: model => api.post('/catelog/express/details', model)
}
