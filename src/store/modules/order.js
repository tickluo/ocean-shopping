import {
  SET_ORDER_LIST,
  SET_DISPLAY_ORDER,
  SET_PACKAGE_LIST,
  SET_DISPLAY_PACKAGE,
  SET_PACKAGE_IDS
} from '../mutation-types'
import { PackageStatus } from '../../local/enum'

const state = {
  orderList: [],
  orderDetail: {},
  packageListBefore: [],
  packageListAfter: [],
  storeDetail: {},
  shipOrder: {
    PackageIds: []
  }
}

const mutations = {
  [SET_ORDER_LIST] (state, list) {
    state.orderList = list
  },
  [SET_DISPLAY_ORDER] (state, data) {
    state.orderDetail = data
  },
  [SET_PACKAGE_LIST] (state, list) {
    state.packageListBefore = list
      .filter(item => item.PackageStauts === PackageStatus.PackageSend)
    state.packageListAfter = list
      .filter(item => item.PackageStauts === PackageStatus.PackageWarehouse)
  },
  [SET_DISPLAY_PACKAGE] (state, data) {
    state.storeDetail = data
  },
  [SET_PACKAGE_IDS] (state, ids) {
    state.shipOrder.PackageIds = []
    ids.forEach(item => {
      state.shipOrder.PackageIds.push(item)
    })
  }
}

export default {
  state,
  mutations
}
