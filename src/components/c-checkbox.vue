<template>
  <div class="icon_circle_stroke icon_circle_fill"
       :class=" {'icon_circle_fill':selected,'icon_circle_stroke_disable': disable}">
    <input type="hidden" name="" value="">
  </div>
</template>

<script>
  export default{
    props: ['selected', 'disable'],
    data(){
      return {}
    }
  }
</script>
