<template>
  <load-more :top-method="loadTop"
             :bottom-method="loadBottom"
             :bottom-all-loaded="allLoaded"
             :auto-fill="false">
    <section class="faq">
      <div class="faq_con" v-for="faq in faqList">
        <h4 class="tit2">
          {{$index + 1}}.{{faq.Title}}
        </h4>
        <p class="faq_text"> A:
          {{faq.Contents}} </p>
      </div>
    </section>
  </load-more>
</template>

<script>
  import LoadMore from '../../components/c-loadmore.vue'
  import { cart } from '../../store/action'

  export default{
    data(){
      return {
        pageIndex: 0,
        allLoaded: false
      }
    },
    components: {
      LoadMore
    },
    vuex: {
      getters: {
        faqList: state => state.cart.faqList
      },
      actions: {
        getFaq: cart.getFaq
      }
    },
    methods: {
      loadBottom (id) {
        this.getFaq(this.$route.params.key, ++this.pageIndex)
          .then(res => {
            this.allLoaded = res.TotalPage <= this.pageIndex
            this.$broadcast('onBottomLoaded', id)
          })
      }
    },
    ready () {
      if (this.faqList.length === 0)
        return this.getFaq(this.$route.params.key, ++this.pageIndex)
    }
  }
</script>
