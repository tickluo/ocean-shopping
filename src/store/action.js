import * as api from '../webServices/order.wsvc'
import * as types from './mutation-types'

export const getShopping = ({ dispatch }, model) => {
  api.getShopping(model).then(shopping => {
    dispatch(types.RECEIVE_SHOPPING_INFO, shopping)
  })
}
