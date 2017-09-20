<template>
  <body v-bind:class="'theme-' + color">
    <navbar v-on:toggle-menu="toggleMenu"></navbar>
    <sidebar v-bind="sidebarProps"></sidebar>
    <main-section></main-section>
  </body>
</template>

<script>
  var NavBar = require('./navbar.vue');
  var MainSection = require('./main-section.vue');
  var SideBar = require('./sidebar.vue');

  module.exports = {
    data: function() {
      return {
        'color': 'blue',
        'sidebarProps': {
          'opened': false
        }
      }
    },
    components: {
      'navbar': NavBar,
      'main-section': MainSection,
      'sidebar': SideBar
    },
    methods: {
      toggleMenu: function() {
        // Received 'toggle-menu' event, toggling 'sidebarProps.opened' on/off
        this.sidebarProps.opened = this.sidebarProps.opened != true;
        console.log('Open : ' + this.sidebarProps.opened);
        // Testing socket.io accessibility
        console.log(io);
      }
    }
  }
</script>

<style>
  body {
    padding-top: 90px;
  }
</style>