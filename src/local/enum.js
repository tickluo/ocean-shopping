/**
 *运单显示状态
 */
const ShipStatus = Object.freeze({
  // 待付款
  ShipPending: 1,
  // 即将转运
  ShipWating: 2,
  // 转运中
  Shipping: 4,
  // 转运中
  Shipped: 8,
  // 抵达中国
  Arrived: 16,
  // 已收货
  Complete: 200,
  // 已取消
  Cancelled: 250
})

/**
 *订单显示状态
 */
const OrderStatus = Object.freeze(
  {
    // 未付款
    OrderPending: 1,
    // 待处理
    OrderWaitingBuy: 2,
    // 订购中
    OrderProcessing: 4,
    // 已订购
    OrderWaitingSend: 200,
    // 已取消
    OrderCancelled: 250

  }
)

/**
 商品显示状态
 */
const ProductStatus = Object.freeze({
  // 待付款
  ProductPending: 1,
  // 即将订购
  ProductWaitingBuy: 2,
  // 官网订购中
  ProductProcessing: 4,
  // 等待官网发货
  ProductWaitingSend: 8,
  // 官方已发货"
  ProductSend: 16,
  // 已入库"
  ProductWarehouse: 32,
  // 转运中"
  ProductShipping: 64,
  // 已收货"
  ProductComplete: 200,
  // 直邮运送中
  ProductDirectMailInTransit: 201,
  // 直邮已收货
  ProductDirectMailIsTheReceipt: 202,
  // 已取消
  ProductCancelled: 250
})

/**
 包裹状态
 */
const PackageStatus = Object.freeze({
  // 官方已发货
  PackageSend: 1,
  // 已入库
  PackageWarehouse: 200
})

export {
  ShipStatus,
  OrderStatus,
  ProductStatus,
  PackageStatus
}

