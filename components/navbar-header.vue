<template>
  <div class="row">
	  <div class="navbar-header col-xs-10">
      <a class="navbar-brand" v-on:click.prevent="" href="#">{{title}}</a>
	  </div>
    <div class="navbar-header col-xs-2">
      <div class="pull-right">
        <a class="navbar-brand" v-on:click.prevent.left="toggleMenu" href="#">
          <transition name="fade" mode="out-in">
            <i v-if="sidebaropened" class="material-icons" key="close">close</i>
            <i v-else class="material-icons" key="open">menu</i>
          </transition>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
	module.exports = {
		props: ['title'],
    computed: {
      'sidebaropened': function() {
        return this.$store.state.sidebar.opened;
      }
    }
    ,
    methods: {
      toggleMenu: function(event) {
        this.$store.commit('toggleSidebar');
        this.$socket.emit('hello', 'hello');
      }
    }
	}
</script>

<style>
  .navbar-header .navbar-brand {
    margin-left: auto !important
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0
  }
</style>