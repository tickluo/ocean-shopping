<template>
  <div>
    <section class="faq">
      <div class="faq_con" v-for="faq in faqList">
        <h4 class="tit2">
          {{$index + 1}}.{{faq.Title}}
        </h4>
        <p class="faq_text"> A:
          {{faq.Contents}} </p>
      </div>
    </section>
    <div v-if="!faqAllLoaded"
         class="btn_wrap"
         @click="loadMore">
      <a class="more_question">更多常见问题</a>
    </div>
    <p v-if="faqAllLoaded" class="no_more_question">无更多问题</p>
  </div>
</template>

<script>
  import { cart } from '../../store/action'

  export default{
    data(){
      return {
        pageIndex: 1,
        allLoaded: false
      }
    },
    vuex: {
      getters: {
        faqList: state => state.cart.faqList,
        faqIndex: state => state.cart.faqIndex,
        faqAllLoaded: state => state.cart.faqAllLoaded
      },
      actions: {
        getFaq: cart.getFaq,
        setFaqIndex: cart.setFaqIndex,
        setFaqLoaded: cart.setFaqLoaded
      }
    },
    methods: {
      loadMore () {
        this.getFaq(this.faqIndex + 1)
          .then(res => {
            if (res.Success) this.setFaqIndex(this.faqIndex + 1)
            if (res.TotalPage <= this.faqIndex) this.setFaqLoaded(true)
          })
      }
    },
    ready () {
      if (this.faqList.length === 0)
        return this.getFaq(1)
    }
  }
</script>
