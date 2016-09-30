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

const getRateById = id => state.rates
  .find(rate => rate.WebSiteId === id).Rate

const genPrice = shopping =>
(shopping.OriginalPrice * getRateById(shopping.WebSiteId)).toFixed(2) * shopping.Quantity

const getRulePrice = (rule, price, rate) => {
  if (rule.ExpensesType === ExpensesType.NotFull) {
    if (price < rule.LimitPrice * rate) return (rule.ExpensesPrice * rate).toFixed(2) * 1
  }
  if (rule.ExpensesType === ExpensesType.Must) {
    return (rule.ExpensesPrice * rate).toFixed(2) * 1
  }
  return 0
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
      state.shoppingTotalPrice = 0
      state.order = Object.assign({}, {
        selectAll: true,
        selected: state.cartList.map(list => {
          let shopTotalPrice = 0
          list.GrabAttrs.forEach(item => {
            shopTotalPrice += parseFloat(genPrice(item))
          })
          const Rate = state.rates.find(item => item.WebSiteId === list.GrabAttrs[0].WebSiteId).Rate
          const RulePrice = getRulePrice(list.Rule, shopTotalPrice, Rate)
          state.shoppingTotalPrice += RulePrice
          return ({
            selectShop: true,
            CountryId: list.GrabAttrs[0].CountryId,
            Rate,
            RulePrice,
            Rule: list.Rule,
            shopping: list.GrabAttrs.map(item => item.Id)
          })
        })
      })
      state.cartList.forEach(shop => {
        shop.GrabAttrs.forEach(item => {
          state.shoppingTotalPrice += parseFloat(genPrice(item))
        })
      })
    } else {
      state.order = {
        selectAll: false,
        selected: state.cartList.map(list => {
          const Rate = state.rates.find(item => item.WebSiteId === list.GrabAttrs[0].WebSiteId).Rate
          const CountryId = list.GrabAttrs[0].CountryId
          return ({
            selectShop: false,
            CountryId,
            Rate,
            RulePrice: 0,
            Rule: list.Rule,
            shopping: []
          })
        })
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
      let shopTotalPrice = 0
      state.cartList[shopId].GrabAttrs
        .forEach(item => {
          const shoppingPrice = parseFloat(genPrice(item))
          if (!state.order.selected[shopId].shopping.includes(item.Id)) {
            state.order.selected[shopId].shopping.push(item.Id)
            state.shoppingTotalPrice += shoppingPrice
          }
          shopTotalPrice += shoppingPrice
        })
      const rulePriceTemp = getRulePrice(state.cartList[shopId].Rule
        , shopTotalPrice
        , state.order.selected[shopId].Rate)
      if (state.order.selected[shopId].RulePrice === 0) {
        state.shoppingTotalPrice += rulePriceTemp
      } else if (rulePriceTemp === 0 && state.order.selected[shopId].RulePrice !== 0) {
        state.shoppingTotalPrice -= state.order.selected[shopId].RulePrice
      }
      state.order.selected[shopId].RulePrice = rulePriceTemp
    } else {
      state.order.selected[shopId].selectShop = false
      /**
       * important!! vue cannot observe Array s change unless use splice or $set
       */
      state.order.selected[shopId].shopping.splice(0, state.order.selected[shopId].shopping.length)
      state.cartList[shopId].GrabAttrs
        .forEach(item => {
          state.shoppingTotalPrice -= parseFloat(genPrice(item))
        })
      if (state.order.selected[shopId].RulePrice !== 0) {
        state.shoppingTotalPrice -= state.order.selected[shopId].RulePrice
      }
      state.order.selected[shopId].RulePrice = 0
    }
    state.order.selectAll = state.order.selected.every(item => item.selectShop === true)
  },
  [SELECT_SHOPPING] (state, toggle, shopId, id) {
    let shopPriceTemp = 0
    const rule = state.order.selected[shopId].Rule
    const shoppingPriceTemp = parseFloat(genPrice(state.cartList[shopId].GrabAttrs
      .find(item => item.Id === id)))
    const shopRate = state.order.selected[shopId].Rate
    if (toggle) {
      state.order.selected[shopId].shopping.push(id)
      state.shoppingTotalPrice += shoppingPriceTemp
    } else {
      state.order.selected[shopId].shopping
        .splice(state.order.selected[shopId].shopping.indexOf(id), 1)
      state.shoppingTotalPrice -= shoppingPriceTemp
    }
    state.order.selected[shopId].selectShop =
      state.cartList[shopId].GrabAttrs.length === state.order.selected[shopId].shopping.length
    if (rule.ExpensesType === ExpensesType.NotFull) {
      state.order.selected[shopId].shopping.forEach(shoppingId => {
        shopPriceTemp += parseFloat(genPrice(state.cartList[shopId].GrabAttrs
          .find(item => item.Id === shoppingId)))
      })
      if (state.order.selected[shopId].RulePrice !== 0 &&
        rule.LimitPrice * shopRate <= (shopPriceTemp)) {
        state.shoppingTotalPrice -= (rule.ExpensesPrice * shopRate).toFixed(2) * 1
        state.order.selected[shopId].RulePrice = 0
      }
      if (state.order.selected[shopId].RulePrice === 0 &&
        rule.LimitPrice * shopRate > (shopPriceTemp) &&
        state.order.selected[shopId].shopping.length !== 0) {
        state.shoppingTotalPrice += (rule.ExpensesPrice * shopRate).toFixed(2) * 1
        state.order.selected[shopId].RulePrice = (rule.ExpensesPrice * shopRate).toFixed(2) * 1
      }
      if (state.order.selected[shopId].RulePrice !== 0 &&
        state.order.selected[shopId].shopping.length === 0) {
        state.shoppingTotalPrice -= (rule.ExpensesPrice * shopRate).toFixed(2) * 1
        state.order.selected[shopId].RulePrice = 0
      }
    }
    if (rule.ExpensesType === ExpensesType.Must) {
      if (state.order.selected[shopId].shopping.length === 0) {
        state.shoppingTotalPrice -= (rule.ExpensesPrice * shopRate).toFixed(2) * 1
        state.order.selected[shopId].RulePrice = 0
      }
      if (state.order.selected[shopId].shopping.length === 1 && toggle) {
        state.shoppingTotalPrice += (rule.ExpensesPrice * shopRate).toFixed(2) * 1
        state.order.selected[shopId].RulePrice = (rule.ExpensesPrice * shopRate).toFixed(2) * 1
      }
    }
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
    state.company.companySet = []
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
    state.company.companySet.splice(index, 1, company)
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

