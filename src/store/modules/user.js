import createPersist from 'vuex-localstorage'
import { sessionConfig } from '../../local/config.enum'
import {
  SET_DEFAULT_ADDRESS,
  SET_SELECT_ADDRESS,
  SET_PAY_ORDER,
  SET_MODIFY_ADDRESS
} from '../mutation-types'

const USER_ENV_KEY = 'USER_ENV_KEY'

const persist = createPersist(USER_ENV_KEY, {
  defaultAddress: {},
  modifyAddress: {},
  selectAddress: 0,
  payOrder: {}
}, {
  expires: sessionConfig.Duration
})

const state = persist.get()

const mutations = {
  [SET_DEFAULT_ADDRESS] (state, address) {
    state.defaultAddress = address
    persist.set(state)
  },
  [SET_MODIFY_ADDRESS] (state, address) {
    state.modifyAddress = address
    persist.set(state)
  },
  [SET_SELECT_ADDRESS] (state, id) {
    state.selectAddress = id
    persist.set(state)
  },
  [SET_PAY_ORDER] (state, pay) {
    state.payOrder = pay
    persist.set(state)
  }
}

export default {
  state,
  mutations
}
