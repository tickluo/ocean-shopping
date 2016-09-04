import api from '../webServices/api.wsvc'

export default {
  getShopping: model => api.post('', model)
}
