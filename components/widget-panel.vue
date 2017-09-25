<template>
  <article>
    <div class="container-fluid">
      <div class="block-header">
        <h2>{{widgetTitle}}</h2>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <div class="card"></div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
  export default {
    props: ['widget-title'],
  }
</script>