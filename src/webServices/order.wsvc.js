import api from '../webServices/api.wsvc'

export const getShopping = model => {
  return api.post('', model)
}
