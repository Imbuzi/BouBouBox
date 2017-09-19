<template>
  <div class="navbar-header">
	  <div class="col-xs-10">
      <a class="navbar-brand" v-on:click.prevent="" href="#">{{title}}</a>
	  </div>
    <div class="col-xs-2">
      <div class="pull-right">
        <a class="navbar-brand" v-on:click.prevent="" href="#">
          <i class="material-icons">menu</i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
	module.exports = {
		props: ['title']
	}
</script>