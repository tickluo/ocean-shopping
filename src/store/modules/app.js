import {
  SET_APP_CURRENCY,
  GEN_PAY,
  SET_LOADING,
  SET_SUBMIT_LOADING,
  SHOW_ALERT,
  SHOW_CONFIRM,
  HIDE_CONFIRM
} from '../mutation-types'

const state = {
  Currency: {},
  genPay: false,
  loading: false,
  submitLoading: {
    loading: false,
    message: ''
  },
  alert: {
    show: false,
    alertMsg: ''
  },
  confirm: {
    show: false,
    checkMsg: '',
    actionMsg: '',
    handleMsg: '',
    handle: () => {
    }
  }
}

const mutations = {
  [SET_APP_CURRENCY] (state, currency) {
    state.Currency = currency
  },
  [GEN_PAY] (state, toggle) {
    state.genPay = toggle
  },
  [SET_LOADING] (state, toggle) {
    if (toggle) state.loading = true
    else {
      setTimeout(() => {
        state.loading = false
      }, 300)
    }
  },
  [SET_SUBMIT_LOADING] (state, toggle, showMsg) {
    if (toggle) {
      state.submitLoading.message = showMsg
      state.submitLoading.loading = true
    } else {
      setTimeout(() => {
        state.submitLoading.loading = false
      }, 300)
    }
  },
  [SHOW_ALERT] (state, msg, lazyFunc) {
    state.alert.show = true
    state.alert.alertMsg = msg
    setTimeout(() => {
      state.alert.show = false
      state.alert.alertMsg = ''
      if (lazyFunc) lazyFunc()
    }, 2000)
  },
  [SHOW_CONFIRM] (state, data) {
    state.confirm.show = true
    state.confirm.checkMsg = data.tip
    state.confirm.actionMsg = data.action
    state.confirm.handleMsg = data.button
    state.confirm.handle = data.handle
  },
  [HIDE_CONFIRM] (state) {
    state.confirm.show = false
    /* state.confirm.checkMsg = ''
     state.confirm.handleMsg = ''
     state.confirm.handle = () => {
     }*/
  }
}

export default {
  state,
  mutations
}
