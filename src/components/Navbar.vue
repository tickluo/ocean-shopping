<script>
  export default {
    name: "Navbar"
  }
</script>

<template>
  <div class="top-bar">
    <div class="top-bar-left">
      <ul class="dropdown menu" data-dropdown-menu>
        <li class="menu-text">Vue Webgulp</li>
        <li><a v-link="'fill'">Fill</a></li>
        <li><a v-link="'modify'">Modify</a></li>
      </ul>
    </div>
  </div>
</template>
