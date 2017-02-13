const sessionConfig = {
  Key: 'SCKEY',
  AuthKey: 'SCAKEY',
  AppConfig: 'SCAPPKEY',
  LoginRoute: 'SCLROUTE',
  ErrorMsg: 'SCERRMSG',
  Duration: 86400000
}

const CountryNumber = Object.freeze({
  1: 'jp',
  2: 'usa',
  3: 'cn',
  4: 'en',
  5: 'eur'
})

/* const CountryNumber = Object.freeze({
 1: 'jp',
 2: 'usa',
 3: 'cn',
 4: 'eur',
 5: 'en'
 })*/

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

const timeStamp = {
  cart: 21600000,
  order: 900000
}

const ExpressUrl = 'https://m.kuaidi100.com/result.jsp?nu='

const DisclaimerUrl = 'https://www.6city.com/Html/disclaimer.html'

const lbToG = 453.59237

export {
  sessionConfig,
  WayType,
  PayType,
  ExpensesType,
  lbToG,
  PageSize,
  ExpressUrl,
  DisclaimerUrl,
  CountryNumber,
  timeStamp
}
