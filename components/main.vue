<template>
  <body v-bind:class="'theme-' + color">
    <navbar></navbar>
    <main-section></main-section>
  </body>
</template>

<script>
  var NavBar = require('./navbar.vue');
  var MainSection = require('./main-section.vue');

  module.exports = {
    data: function() {
      return {
      'color': 'blue'
      }
    },
    components: {
      'navbar': NavBar,
      'main-section': MainSection
    }
  }
</script>

<style scoped>
  body {
    padding-top: 90px;
  }
</style>