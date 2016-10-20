<template>
  <section class="select_attr_wrap" v-if="skuSelect">
    <h4 class="select_attr_wrap_tit">
      {{title}} <span class="font-weight_6">{{CurrrentDisplayOption}}</span>
    </h4>
    <ul class="select_attr_list">
      <li v-for="item in list" track-by="PropId"
          :class="{'chosed':CheckSelected(item.PropId),'disable_chose':CheckDisable(item.PropId)}"
          @click="skuItemClick(item.PropId)">
        {{item.PropertieName}}
      </li>
    </ul>
  </section>
</template>

<script>
  import { cart } from '../store/action'
  import { getDisableSku } from '../services/sku.svc'

  export default{
    props: ['title', 'list', 'id', 'sku', 'skuclasses'],
    vuex: {
      getters: {
        skuSelect: state => state.cart.display.skuSelect,
        disableSku: state => state.cart.display.disableSku
      },
      actions: {
        updateShoppingDisplay: cart.updateShoppingDisplay
      }
    },
    computed: {
      Skus () {
        return this.sku.map((item)=> ({
          SkuId: item.SkuId,
          PropIds: item.PropIds,
          Selected: item.Selected
        }))
      },
      CurrrentDisplayOption () {
        return this.SelectOption(this.skuSelect.PropIds[this.id]).PropertieName
      }
    },
    methods: {
      skuItemClick (PropId) {
        let context = this
        /**
         * check if has been selected or disabled
         */
        if (context.skuSelect.PropIds.includes(PropId) || context.disableSku.includes(PropId)) return
        /**
         * set current SKU selected
         */
        let propIdsBuffer = context.skuSelect.PropIds.join(',').split(',')
        propIdsBuffer.splice(PropId.charAt(0) * 1, 1, PropId)
        let currentSku = context.sku.find(item => item.PropIds.toString() === propIdsBuffer.toString())
        /**
         * get disabled SKU options
         */
        let disableSkuArray = getDisableSku(context.skuclasses, currentSku, context.Skus)
        let pic = context.SelectOption(PropId).Picture

        context.updateShoppingDisplay({
          picture: pic,
          disableSku: disableSkuArray,
          skuSelect: currentSku,
          skuOptionDisplay: context.SelectOption(PropId)
        })
      },
      CheckSelected (PropId) {
        return this.skuSelect.PropIds.includes(PropId)
      },
      CheckDisable (PropId) {
        return this.disableSku && this.disableSku.includes(PropId)
      },
      SelectOption (PropId) {
        return this.list.find(item => item.PropId === PropId)
      }
    }
  }
</script>
