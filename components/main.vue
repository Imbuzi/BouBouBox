<template>
  <body v-bind:class="'theme-' + color">
    <navbar title="BouBouBox"></navbar>
    <sidebar></sidebar>
    <main-section></main-section>
  </body>
</template>

<script>
  var NavBar = require('./navbar.vue');
  var MainSection = require('./main-section.vue');
  var SideBar = require('./sidebar.vue');

  module.exports = {
    computed: {
      color: function() {
        return this.$store.state.theme.color;
      }
    }
    components: {
      'navbar': NavBar,
      'main-section': MainSection,
      'sidebar': SideBar
    }
  }
</script>

<style>
  body {
    padding-top: 90px;
  }
</style>