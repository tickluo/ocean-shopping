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
  DECREASE_SHOPPING_COUNT,
  SET_DEFAULT_COMPANY,
  SAVE_COUNTRY_RATE,
  SAVE_SHOP_RATE,
  SET_COMPANY_BY_CID,
  REMOVE_SHOPPING_BY_ID,
  SET_FAQ
} from '../mutation-types'
import { ExpensesType } from '../../local/config.enum'

const state = {
  detail: {},
  display: {},
  cartList: [],
  order: {},
  company: {
    companySet: []
  },
  countries: [],
  rates: [],
  shoppingTotalPrice: 0,
  faqList: []
}

// TODO: calculate the Rule and express fee
const genPrice = shopping => (shopping.OriginalPrice * state.rates
  .find(rate => rate.WebSiteId === shopping.WebSiteId).Rate).toFixed(2) * shopping.Quantity

const addRulePrice = (rule, price) => {
  if (rule.ExpensesType === ExpensesType.NotFull) {
    if (price < rule.LimitPrice) state.shoppingTotalPrice += rule.ExpensesPrice
  }
  if (rule.ExpensesType === ExpensesType.Must) {
    if (price > rule.LimitPrice) state.shoppingTotalPrice += rule.ExpensesPrice
  }
}
/*
 const computeTotlePrice = () => {

 }
 */

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
    // TODO: split select all and init selected
    if (toggle) {
      state.order = {
        selectAll: true,
        selected: state.cartList.map(list => ({
          selectShop: true,
          CountryId: list.GrabAttrs[0].CountryId,
          Rate: state.rates.find(item => item.WebSiteId === list.GrabAttrs[0].WebSiteId).Rate,
          Rule: list.Rule,
          shopping: list.GrabAttrs.map(item => item.Id)
        }))
      }
      state.shoppingTotalPrice = 0
      state.cartList.forEach(shop => {
        let shopTotalPrice = state.shoppingTotalPrice
        shop.GrabAttrs.forEach(item => {
          state.shoppingTotalPrice += parseFloat(genPrice(item))
        })
        shopTotalPrice = state.shoppingTotalPrice - shopTotalPrice
        addRulePrice(shop.Rule, shopTotalPrice)
      })
    } else {
      state.order = {
        selectAll: false,
        selected: state.cartList.map(list => ({
          selectShop: false,
          shopping: []
        }))
      }
      state.shoppingTotalPrice = 0
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
          let shopTotalPrice = state.shoppingTotalPrice
          state.shoppingTotalPrice += parseFloat(genPrice(item))
          shopTotalPrice = state.shoppingTotalPrice - shopTotalPrice
          addRulePrice(state.cartList[shopId].Rule, shopTotalPrice)
        })
    } else {
      state.order.selected[shopId].selectShop = false
      /**
       * important!! vue cannot observe Array s change unless use splice or $set
       */
      state.order.selected[shopId].shopping.splice(0, state.order.selected[shopId].shopping.length)
      let shopTotalPrice = state.shoppingTotalPrice
      state.cartList[shopId].GrabAttrs
        .forEach(item => {
          state.shoppingTotalPrice -= parseFloat(genPrice(item))
        })
      shopTotalPrice -= state.shoppingTotalPrice
      addRulePrice(state.cartList[shopId].Rule, shopTotalPrice)
    }
    state.order.selectAll = state.order.selected.every(item => item.selectShop === true)
  },
  [SELECT_SHOPPING] (state, toggle, shopId, id) {
    if (toggle) {
      state.order.selected[shopId].shopping.push(id)
      state.shoppingTotalPrice += parseFloat(genPrice(state.cartList[shopId].GrabAttrs
        .find(item => item.Id === id)))
    } else {
      state.order.selected[shopId].shopping
        .splice(state.order.selected[shopId].shopping.indexOf(id), 1)
      state.shoppingTotalPrice -= parseFloat(genPrice(state.cartList[shopId].GrabAttrs
        .find(item => item.Id === id)))
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
  },
  [SET_DEFAULT_COMPANY] (state, companyList) {
    companyList.forEach((item, index) => {
      state.company.companySet.$set(index, item)
    })
  },
  [SAVE_SHOP_RATE] (state, rateList) {
    rateList.forEach((item, index) => {
      state.rates.$set(index, item)
    })
  },
  [SAVE_COUNTRY_RATE] (state, countryList) {
    countryList.forEach((item, index) => {
      state.countries.$set(index, item)
    })
  },
  [SET_COMPANY_BY_CID] (state, countryId, company) {
    const index = state.company.companySet.findIndex(item => item.CountryId === countryId)
    state.company.companySet.splice(index, 1)
    state.company.companySet.$set(index, company)
  },
  [REMOVE_SHOPPING_BY_ID] (state, shopId, id) {
    state.cartList[shopId].GrabAttrs
      .splice(state.cartList[shopId].GrabAttrs.findIndex(item => item.Id === id), 1)
  },
  [SET_FAQ] (state, list) {
    state.faqList = list
  }
}

export default {
  state,
  mutations
}

