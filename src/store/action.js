/* import api from '../webServices/order.wsvc'*/
import * as types from './mutation-types'

export default ({ dispatch }, model) => {
  /* api.getShopping(model).then(shopping => {
   dispatch(types.RECEIVE_SHOPPING_INFO, shopping)
   })*/
  dispatch(types.RECEIVE_SHOPPING_INFO, {
    name: 'test',
    price: '15.0'
  })
}
