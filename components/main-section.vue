<template>
  <section>
    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12">
          <widget-panel></widget-panel>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  var WidgetPanel = require('./widget-panel.vue');

  module.exports = {
  data: function() {
  return {
  'color': 'blue'
  }
  },
  components: {
  'widget-panel': WidgetPanel
  }
  }
</script>