const WayType = Object.freeze({
  Range: 4,
  Math: 2
})

const PayType = {
  WeiXinPay: 20,
  AliPay: 30
}

const ExpensesType = {
  NotFull: 2,
  Must: 4,
  NotMust: 8,
  NoSet: 200
}

const PageSize = 6

const ExpressUrl = 'http://m.kuaidi100.com/result.jsp?nu='

const lbToG = 453.59237

export {
  WayType,
  PayType,
  ExpensesType,
  lbToG,
  PageSize,
  ExpressUrl
}
