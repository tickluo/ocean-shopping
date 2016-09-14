export const matchCompanyShop = (company, shops) => {
  const res = []
  company.forEach(ship => {
    const shipCompany = {
      GrabAttrs: []
    }
    shipCompany.ShipComapnyId = ship.ShippingCompany.ShippingWayDefault.ShippingCompanyId
    shops.filter(shop => shop.CountryId === ship.CountryId).forEach(shop => {
      if (shop.selectShop) shipCompany.GrabAttrs.push({ Ids: shop.shopping, Rate: shop.Rate })
    })
    res.push(shipCompany)
  })
  return res
}

export const next = () => {
}
