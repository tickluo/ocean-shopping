import api from '../webServices/api.wsvc'

export default {
  getDefaultAddress: model => api.post('/address/default', model, true),
  getUserAddress: model => api.post('/address/list', model, true),
  uploadIdCard: model => api.post('/address/upload', model),
  saveAddress: model => api.post('/address/modify', model),
  deleteAddress: model => api.post('/address/delete', model, true),
  sendMessage: model => api.post('/userlogin/send/messages', model, true),
  userRegister: model => api.post('/userlogin/register', model, true),
  userLogin: model => api.post('/userlogin/login', model, true),
  canLogin: model => api.post('/userlogin/islogin', model)
}
