<template>
  <section>
    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12">
          <widget-panel widget-title="Titre"></widget-panel>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import WidgetPanel from './widget-panel.vue';

  export default {
    components: {
      'widget-panel': WidgetPanel
    }
  }
</script>