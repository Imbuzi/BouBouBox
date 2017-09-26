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
	export default {
        computed: {
            'sidebaropened': function() {
            return this.$store.state.sidebar.opened;
            },
            'title': function() {
            return this.$store.state.sidebar.title;
            }
        }
        ,
        methods: {
            toggleMenu: function(event) {
            this.$store.commit('toggleSidebar');
            }
        }
	}
</script>

<style scoped>
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