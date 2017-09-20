<template>
  <div class="row">
	  <div class="navbar-header col-xs-10">
      <a class="navbar-brand" v-on:click.prevent="" href="#">{{title}}</a>
	  </div>
    <div class="navbar-header col-xs-2">
      <div class="pull-right">
        <a class="navbar-brand" v-on:click.prevent.left="toggleMenu" href="#">
          <i class="material-icons">menu</i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
	module.exports = {
		props: ['title'],
    methods: {
      toggleMenu: function(event) {
        console.log('Child event');
        console.log(event);
        this.$emit('toggle-menu');
      }
    }
	}
</script>

<style>
  .navbar-header .navbar-brand {
    margin-left: auto !important;
  }
</style>