<template>
  <div class="row">
	  <div class="navbar-header col-xs-10">
      <a class="navbar-brand" v-on:click.prevent="" href="#">{{title}}</a>
	  </div>
    <div class="navbar-header col-xs-2">
      <div class="pull-right">
        <a class="navbar-brand" v-on:click.prevent.left="toggleMenu" href="#">
          <transition name="fade" mode="out-in">
            <i v-if="opened" class="material-icons">menu</i>
            <i v-if="!opened" class="material-icons">close</i>
          </transition>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
	module.exports = {
		props: ['title'],
    data: function() {
      return {
        'opened': false
      }
    },
    methods: {
      toggleMenu: function(event) {
        // Received 'click' event, let's send it to the parent component !
        this.opened = !this.opened;
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