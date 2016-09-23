<template>
  <div class="icon_circle_stroke icon_circle_fill" :class=" {'icon_circle_fill':selected}">
    <input type="hidden" name="" value="">
  </div>
</template>

<script>
  export default{
    props: ['selected'],
    data(){
      return {}
    }
  }
</script>
