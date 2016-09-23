<template>
  <div>
    <article class="order_wrap">
      <h4 class="order_number">
        <div class="real_number">
          已选择 <span class="font-weight_6">{{selectCount}}</span>个包裹（还能选择{{restCount}}个）
        </div>
      </h4>
      <div class="package_weight">
        <label>合箱重量</label>
        <div class="text_align_r"
             :class="{'over_weight':overWeight}">
          <p><strong>{{totalWeight}}</strong></p>
          <p>重量上限：{{box.LimitWeight}}g</p>
        </div>
      </div>
      <div class="package_weight">
        <label>合箱货值</label>
        <div class="text_align_r"
             :class="{'over_weight':overPrice}">
          <p><strong>RMB {{totalPrice}}</strong></p>
          <p>货值上限：RMB {{box.LimitMoney}}</p>
        </div>
      </div>
    </article>

    <article class="order_wrap" v-for="package in packages">
      <h3 class="shopping_cart_tit height_08">
        <div class="icon_circle_stroke"
             :class="{'icon_circle_fill':hasSelect(package.Id)}"
             @click="selectPackage(package.Id)">
          <input type="hidden" name="" value="">
        </div>

        <span class="shop_brand_name">包裹：{{package.PackageNo}}</span>
      </h3>

      <h4 class="order_number huozhi">
        <div class="real_number">货值
          <span class="font-weight_6">RMB {{package.PackageTotalAmount}}</span>
          ,包裹重量{{package.Weight}}g
        </div>
      </h4>
      <display-shopping v-for="shopping in package.GrabAttrs"
                        :cover="shopping.Cover"
                        :name="shopping.Name"
                        :price="shopping.Price"
                        :quantity="shopping.Quantity"
                        :sku="shopping.Sku">
      </display-shopping>
    </article>

    <footer class="shopping_footer">
      <div class="icon_shopping_cart_1" v-link="{name:'submitStore'}">
        <img class="icon_go_back_cart icon_back" :src="images.iconGoback" alt="">
        <span class="goback_cart">返回</span></div>
      <div class="into_cart_btn" @click="mergePackage">
        <img class="icon_into_shopping_cart" :src="images.iconOk">
        <span class="dis_inline_block">完成</span>
      </div>
    </footer>
  </div>
</template>

<script>
  import images from '../../asset/images'
  import { orders } from '../../store/action'
  import displayShopping from '../layout/display-shopping.vue'

  export default{
    data(){
      return {
        images,
        packages: [],
        selectIds: [],
        defaultWeight: 0,
        defaultPrice: 0,
        totalWeight: 0,
        totalPrice: 0
      }
    },
    components: {
      displayShopping
    },
    computed: {
      selectCount () {
        return this.selectIds.length
      },
      restCount () {
        if (this.selectCount < this.box.LimitNumber) {
          return this.box.LimitNumber - this.selectCount
        }
        return 0
      },
      overWeight() {
        return this.totalWeight > this.box.LimitWeight
      },
      overPrice() {
        return this.totalPrice > this.box.LimitMoney
      }
    },
    methods: {
      hasSelect (id) {
        return this.selectIds.includes(id)
      },
      selectPackage (id) {
        this.totalWeight = this.defaultWeight
        this.totalPrice = this.defaultPrice
        this.selectIds.includes(id) ?
          this.selectIds.$remove(id) :
          this.selectIds.push(id)
        this.selectIds.forEach(id => {
          let pacTemp = this.packages.find(item=>item.Id === id)
          this.totalWeight += pacTemp.Weight
          this.totalPrice = parseFloat(this.totalPrice + pacTemp.PackageTotalAmount).toFixed(2) * 1
        })
      },
      mergePackage () {
        let mergePac = Array.from(this.selectIds)
        this.setPackageIds(mergePac)
        this.$router.go({ name: 'submitStore' })
      }
    },
    vuex: {
      getters: {
        defaultPid: state=>state.orders.defaultPid,
        box: state => state.orders.box
      },
      actions: {
        setPackageIds: orders.setPackageIds
      }
    },
    route: {
      data ({ to: { params: { id, key } } }) {
        return orders.getPackageByShipId(key, id)
          .then(res => {
            if (res.Success) {
              this.selectIds = []
              let index = res.List.findIndex(item => item.Id === this.defaultPid)
              this.defaultWeight = res.List[index].Weight
              this.defaultPrice = res.List[index].PackageTotalAmount
              this.totalWeight = this.defaultWeight
              this.totalPrice = this.defaultPrice
              this.packages = res.List
              this.packages.splice(index, 1)
            }
          })
      },
      waitForData: true
    }
  }
</script>
