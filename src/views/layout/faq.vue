<template>
  <section class="faq">
    <div class="faq_con" v-for="faq in faqList">
      <h4 class="tit2">
        {{$index + 1}}.{{faq.Title}}
      </h4>
      <p class="faq_text"> A:
        {{faq.Contents}} </p>
    </div>
  </section>
</template>

<script>
  import { cart } from '../../store/action'
  export default{
    data(){
      return {}
    },
    vuex: {
      getters: {
        faqList: state => state.cart.faqList
      },
      actions: {
        getFaq: cart.getFaq
      }
    },
    ready () {
      if (this.faqList.length === 0)
        return this.getFaq(this.$route.params.key)
    }
  }
</script>
