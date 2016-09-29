import api from '../webServices/api.wsvc'

export default {
  getDefaultAddress: model => api.post('/address/default', model, true),
  getUserAddress: model => api.post('/address/list', model, true),
  uploadIdCard: model => api.post('/address/upload', model),
  saveAddress: model => api.post('/address/modify', model)
}
