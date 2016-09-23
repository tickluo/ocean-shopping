import api from '../webServices/api.wsvc'

export default {
  genAliPay: model => api.post('/payment/ali', model)
}
