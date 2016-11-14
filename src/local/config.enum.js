const sessionConfig = {
  Key: 'SCKEY',
  AuthKey: 'SCAKEY',
  AppConfig: 'SCAPPKEY',
  LoginRoute: 'SCLROUTE',
  ErrorMsg: 'SCERRMSG',
  Duration: 86400
}

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

const DisclaimerUrl = 'http://www.6city.com/Html/disclaimer.html'

const lbToG = 453.59237

export {
  sessionConfig,
  WayType,
  PayType,
  ExpensesType,
  lbToG,
  PageSize,
  ExpressUrl,
  DisclaimerUrl
}
