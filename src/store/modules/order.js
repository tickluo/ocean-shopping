import createPersist from 'vuex-localstorage'
import { sessionConfig } from '../../local/config.enum'
import { PackageStatus, OrderStatus, ProductStatus, ShipStatus } from '../../local/state.enum'
import {
  SET_ORDER_LIST,
  SET_DISPLAY_ORDER,
  SET_PACKAGE_LIST,
  SET_DISPLAY_PACKAGE,
  SET_PACKAGE_IDS,
  SET_DEFAULT_PID,
  SET_SHIP_WAY,
  CLEAR_SHIP_SERVICE,
  ADD_SHIP_SERVICE,
  DEL_SHIP_SERVICE,
  SET_SHIP_BOX,
  SET_TRAN_ORDER_LIST,
  SET_TRAN_ORDER_DETAIL,
  CANCEL_ORDER,
  DELETE_ORDER,
  RECEIPT_GOODS,
  SET_EXPRESS_DETAIL,
  SET_EXPRESS_SITE
} from '../mutation-types'

const ORDER_ENV_KEY = 'ORDER_ENV_KEY'

const persist = createPersist(ORDER_ENV_KEY, {
  orderList: [],
  orderDetail: {},
  packageListBefore: [],
  packageListAfter: [],
  storeDetail: {},
  tranOrderList: [],
  tranOrderDetail: {},
  defaultPid: 0,
  shipOrder: {
    PackageIds: [],
    ShippingWayId: 0,
    ExtraServiceIds: []
  },
  box: {},
  expressInfo: [],
  expressSite: {}
}, {
  expires: sessionConfig.Duration
})

const state = persist.get()

const mutations = {
  [SET_ORDER_LIST] (state, list, index) {
    if (index === 1) state.orderList = list
    else state.orderList = state.orderList.concat(list)
    persist.set(state)
  },
  [SET_DISPLAY_ORDER] (state, data) {
    state.orderDetail = data
    persist.set(state)
  },
  [CANCEL_ORDER] (state, id) {
    const removedOrder = Object.assign({}, state.orderList.find(item => item.Id === id))
    removedOrder.OrderStatus = OrderStatus.OrderCancelled
    removedOrder.OrderStatusName = '已取消'
    removedOrder.GrabAttrs.forEach(item => {
      item.ProductStautName = '已取消'
      item.ProductStauts = ProductStatus.ProductCancelled
    })
    state.orderList.splice(state.orderList.findIndex(item => item.Id === id), 1, removedOrder)
    persist.set(state)
  },
  [DELETE_ORDER] (state, id) {
    state.orderList.splice(state.orderList.findIndex(item => item.Id === id), 1)
    persist.set(state)
  },
  [SET_PACKAGE_LIST] (state, list) {
    state.packageListBefore = list
      .filter(item => item.PackageStauts === PackageStatus.PackageSend)
    state.packageListAfter = list
      .filter(item => item.PackageStauts === PackageStatus.PackageWarehouse)
    persist.set(state)
  },
  [SET_TRAN_ORDER_LIST] (state, list, index) {
    if (index === 1) state.tranOrderList = list
    else state.tranOrderList = state.tranOrderList.concat(list)
    persist.set(state)
  },
  [SET_DISPLAY_PACKAGE] (state, data) {
    state.storeDetail = data
    persist.set(state)
  },
  [SET_PACKAGE_IDS] (state, ids) {
    state.shipOrder.PackageIds = []
    ids.forEach(item => {
      state.shipOrder.PackageIds.push(item)
    })
    persist.set(state)
  },
  [SET_DEFAULT_PID] (state, id) {
    state.defaultPid = id
    persist.set(state)
  },
  [SET_SHIP_WAY] (state, id) {
    state.shipOrder.ShippingWayId = id
    persist.set(state)
  },
  [SET_SHIP_BOX] (state, box) {
    state.box = box
    persist.set(state)
  },
  [ADD_SHIP_SERVICE] (state, id) {
    state.shipOrder.ExtraServiceIds.push(id)
    persist.set(state)
  },
  [DEL_SHIP_SERVICE] (state, id) {
    state.shipOrder.ExtraServiceIds.$remove(id)
    persist.set(state)
  },
  [CLEAR_SHIP_SERVICE] (state) {
    state.shipOrder.ExtraServiceIds = []
    persist.set(state)
  },
  [SET_TRAN_ORDER_DETAIL] (state, order) {
    state.tranOrderDetail = order
    persist.set(state)
  },
  [RECEIPT_GOODS] (state, id) {
    const removedOrder = Object.assign({}, state.tranOrderList.find(item => item.Id === id))
    removedOrder.ShippingStatus = ShipStatus.Complete
    removedOrder.ShippingStatuName = '已收货'
    removedOrder.GrabAttributes.forEach(item => {
      item.ProductStautName = '已收货'
      item.ProductStauts = ProductStatus.ProductComplete
    })
    state.tranOrderList.splice(state.tranOrderList
      .findIndex(item => item.Id === id), 1, removedOrder)
    persist.set(state)
  },
  [SET_EXPRESS_DETAIL] (state, detail) {
    state.expressInfo = detail
    persist.set(state)
  },
  [SET_EXPRESS_SITE] (state, site) {
    state.expressSite = site
    persist.set(state)
  }
}

export default {
  state,
  mutations
}
