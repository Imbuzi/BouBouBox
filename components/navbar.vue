<template>
    <nav class="navbar">
        <div class="container-fluid">
            <navbar-header v-on:toggle-menu="toggleMenu" v-bind:title="title"></navbar-header>
        </div>
    </nav>
</template>

<script>
	var NavBarHeader = require('./navbar-header.vue');

	module.exports = {
		components: {
			'navbar-header': NavBarHeader
		},
    data: function() {
      return {
        'title': 'Test'
      }
    },
    methods: {
      toggleMenu: function() {
        // Received 'toggle-menu' event, let's send it to the parent component !
        this.$emit('toggle-menu');
      }
    }
	}
</script>