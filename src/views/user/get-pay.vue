<template>
  <div id="payOrderForm"></div>
</template>

<script>
  import config from '../../../config/_base.config'
  import { payWay } from '../../local/restful.enum'

  export default{
    data(){
      return {}
    },
    vuex: {
      getters: {
        payOrder: state => state.user.payOrder
      }
    },
    ready () {
      document.getElementById('payOrderForm').innerHTML =
        `<form id="aliShopForm" action="${config.url + payWay.AliPay}" method="post">
            <input type="hidden" name="key" value="307480468f2bb43dd01b190a169c8084547b4403">
            <input type="hidden" name="BusinessId" value="${this.payOrder.id || 0}">
            <input type="hidden" name="BusinessNo" value="${this.payOrder.orderNo || ''}">
            <input type="hidden" name="PaymentNo" value="${this.payOrder.paymentNo || ''}">
            <input type="hidden" name="BusinessType" value="${this.payOrder.type || ''}">
            <input type="hidden" name="TotalAmount" value="${this.payOrder.totalAmount}">
            <input type="hidden" name="ReturnUrl" value="${config.localhost + this.payOrder.returnUrl}">
            <input type="hidden" name="BackUrl" value="${config.localhost + this.payOrder.backUrl}">
          </form>`
      document.getElementById('aliShopForm').submit()
    }
  }
</script>
