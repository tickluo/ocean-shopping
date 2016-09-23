import api from '../webServices/api.wsvc'

export default {
  getDefaultAddress: model => api.post('/address/default', model),
  getUserAddress: model => api.post('/address/list', model),
  uploadIdCard: model => api.post('/address/upload', model),
  saveAddress: model => api.post('/address/modify', model)
}
