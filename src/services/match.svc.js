import { parseDomain } from './util.svc'

export const matchCompanyShop = (company, shops) => {
  const res = []
  company.forEach(ship => {
    const shipCompany = {
      GrabAttrs: []
    }
    shipCompany.ShipComapnyId = ship.ShippingCompany.ShippingWayDefault.ShippingCompanyId
    shops.filter(shop => shop.CountryId === ship.CountryId).forEach(shop => {
      if (shop.shopping.length > 0) {
        shipCompany.GrabAttrs.push({ Ids: shop.shopping, Rate: shop.Rate })
      }
    })
    res.push(shipCompany)
  })
  return res
}

export const getShopInfo = (rates, shop) =>
  rates.find(item => {
    if (!shop.WebSiteId || shop.WebSiteId === 0) return item.Url === parseDomain(shop.Url)
    return shop.WebSiteId === item.WebSiteId
  })
