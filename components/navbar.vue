<template>
    <nav class="navbar">
        <div class="container-fluid">
            <navbar-header v-on:toggle-menu="toggleMenu" title="{{title}}"></navbar-header>
        </div>
    </nav>
</template>

<script>
	var NavBarHeader = require('./navbar-header.vue');

	module.exports = {
		props: ['title'],
		components: {
			'navbar-header': NavBarHeader
		},
    methods: {
      toggleMenu: function() {
        // Received 'toggle-menu' event, let's send it to the parent component !
        this.$emit('toggle-menu');
      }
    }
	}
</script>