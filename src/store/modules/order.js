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
  RECEIPT_GOODS,
  SET_EXPRESS_DETAIL,
  SET_EXPRESS_SITE
} from '../mutation-types'
import { PackageStatus, OrderStatus, ProductStatus, ShipStatus } from '../../local/state.enum'

const state = {
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
}

const mutations = {
  [SET_ORDER_LIST] (state, list) {
    state.orderList = list
  },
  [SET_DISPLAY_ORDER] (state, data) {
    state.orderDetail = data
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
  },
  [SET_PACKAGE_LIST] (state, list) {
    state.packageListBefore = list
      .filter(item => item.PackageStauts === PackageStatus.PackageSend)
    state.packageListAfter = list
      .filter(item => item.PackageStauts === PackageStatus.PackageWarehouse)
  },
  [SET_TRAN_ORDER_LIST] (state, list) {
    state.tranOrderList = list
  },
  [SET_DISPLAY_PACKAGE] (state, data) {
    state.storeDetail = data
  },
  [SET_PACKAGE_IDS] (state, ids) {
    state.shipOrder.PackageIds = []
    ids.forEach(item => {
      state.shipOrder.PackageIds.push(item)
    })
  },
  [SET_DEFAULT_PID] (state, id) {
    state.defaultPid = id
  },
  [SET_SHIP_WAY] (state, id) {
    state.shipOrder.ShippingWayId = id
  },
  [SET_SHIP_BOX] (state, box) {
    state.box = box
  },
  [ADD_SHIP_SERVICE] (state, id) {
    state.shipOrder.ExtraServiceIds.push(id)
  },
  [DEL_SHIP_SERVICE] (state, id) {
    state.shipOrder.ExtraServiceIds.$remove(id)
  },
  [CLEAR_SHIP_SERVICE] (state) {
    state.shipOrder.ExtraServiceIds = []
  },
  [SET_TRAN_ORDER_DETAIL] (state, order) {
    state.tranOrderDetail = order
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
  },
  [SET_EXPRESS_DETAIL] (state, detail) {
    state.expressInfo = detail
  },
  [SET_EXPRESS_SITE] (state, site) {
    state.expressSite = site
  }
}

export default {
  state,
  mutations
}
