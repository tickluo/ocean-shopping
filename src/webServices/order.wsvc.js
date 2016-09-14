import api from '../webServices/api.wsvc'

export default {
  saveOrder: model => api.post('/order/save', model),
  getOrderList: model => api.post('/order/list', model),
  getOrderDetail: model => api.post('/order/detail', model),
  cancelOrder: model => api.post('/order/cancel', model)
}

