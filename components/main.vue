<template>
  <body v-bind:class="'theme-' + color">
    <navbar></navbar>
    <widget-panel></widget-panel>
  </body>
</template>

<script>
  var NavBar = require('./navbar.vue');
  var WidgetPanel = require('./widget-panel.vue');

  module.exports = {
    data: function() {
      return {
      'color': 'blue'
      }
    },
    components: {
      'navbar': NavBar,
      'widget-panel': WidgetPanel
    }
  }
</script>