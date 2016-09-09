import {
  ADD_TO_CART,
  RECEIVE_SHOPPING_INFO,
  GET_CART_LIST,
  INIT_SHOPPING_DISPLAY,
  UPDATE_SHOPPING_DISPLAY,
  SELECT_ALL_SHOPPING,
  SELECT_SHOP_SHOPPING,
  SELECT_SHOPPING,
  INCREASE_SHOPPING_COUNT,
  DECREASE_SHOPPING_COUNT
} from '../mutation-types'

const state = {
  detail: {},
  display: {},
  cartList: [],
  order: {}
}

const mutations = {
  [ADD_TO_CART] (state, shopping) {
    state.cart = shopping
  },
  [RECEIVE_SHOPPING_INFO] (state, shopping) {
    state.detail = shopping
  },
  [GET_CART_LIST] (state, list) {
    state.cartList = list
  },
  [INIT_SHOPPING_DISPLAY] (state, detail) {
    state.display = detail
  },
  [UPDATE_SHOPPING_DISPLAY] (state, detail) {
    state.display.skuSelect = detail.skuSelect
    state.display.disableSku = detail.disableSku
    state.display.picture = detail.picture ? detail.picture : state.display.picture
  },
  [SELECT_ALL_SHOPPING] (state, toggle) {
    if (toggle) {
      state.order = {
        selectAll: true,
        selected: state.cartList.map(list => ({
          selectShop: true,
          shopping: list.GrabAttrs.map(item => item.Id)
        }))
      }
      state.order.shoppingTotalPrice = 0
      state.cartList.forEach(shop => {
        shop.GrabAttrs.forEach(item => {
          state.order.shoppingTotalPrice += item.Price
        })
      })
    } else {
      state.order = {
        selectAll: false,
        selected: state.cartList.map(list => ({
          selectShop: false,
          shopping: []
        }))
      }
      state.order.shoppingTotalPrice = 0
    }
  },
  [SELECT_SHOP_SHOPPING] (state, toggle, shopId) {
    if (toggle) {
      state.order.selected[shopId].selectShop = true
      /**
       * important!! vue cannot observe Array s change unless use splice or $set
       */
      state.cartList[shopId].GrabAttrs
        .forEach(item => {
          state.order.selected[shopId].shopping.push(item.Id)
        })
      state.cartList[shopId].GrabAttrs
        .forEach(item => {
          state.order.shoppingTotalPrice += item.Price
        })
    } else {
      state.order.selected[shopId].selectShop = false
      /**
       * important!! vue cannot observe Array s change unless use splice or $set
       */
      state.order.selected[shopId].shopping.splice(0, state.order.selected[shopId].shopping.length)
      state.cartList[shopId].GrabAttrs
        .forEach(item => {
          state.order.shoppingTotalPrice -= item.Price
        })
    }
    state.order.selectAll = state.order.selected.every(item => item.selectShop === true)
  },
  [SELECT_SHOPPING] (state, toggle, shopId, id) {
    if (toggle) {
      state.order.selected[shopId].shopping.push(id)
      state.order.shoppingTotalPrice += state.cartList[shopId].GrabAttrs
        .find(item => item.Id === id).Price
    } else {
      state.order.selected[shopId].shopping
        .splice(state.order.selected[shopId].shopping.indexOf(id), 1)
      state.order.shoppingTotalPrice -= state.cartList[shopId].GrabAttrs
        .find(item => item.Id === id).Price
    }
    state.order.selected[shopId].selectShop =
      state.cartList[shopId].GrabAttrs.length === state.order.selected[shopId].shopping.length
    state.order.selectAll = state.order.selected
      .every(item => item.selectShop === true)
  },
  [INCREASE_SHOPPING_COUNT] (state) {
    state.display.count++
  },
  [DECREASE_SHOPPING_COUNT] (state) {
    state.display.count--
  }
}

export default {
  state,
  mutations
}

