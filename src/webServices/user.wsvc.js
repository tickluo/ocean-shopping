import api from '../webServices/api.wsvc'

export default {
  getDefaultAddress: model => api.post('/address/default', model),
  getUserAddress: model => api.post('/address/list', model),
  uploadIdCard: model => api.post('/address/upload', model),
  saveAddress: model => api.post('/address/modify', model),
  deleteAddress: model => api.post('/address/delete', model),
  sendMessage: model => api.post('/userlogin/send/messages', model),
  userRegister: model => api.post('/userlogin/register', model),
  userLogin: model => api.post('/userlogin/login', model),
  canLogin: model => api.post('/userlogin/islogin', model)
}
