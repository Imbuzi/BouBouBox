<template>
    <nav class="navbar">
        <div class="container-fluid">
            <navbar-header v-on:toggle-menu="toggleMenu" title="Titre de test"></navbar-header>
        </div>
    </nav>
</template>

<script>
	var NavBarHeader = require('./navbar-header.vue');

	module.exports = {
		components: {
			'navbar-header': NavBarHeader
		},
    methods: {
      toggleMenu: function() {
        console.log('Received menu toggle on navbar !!!');
        this.$emit('toggle-menu');
      }
    }
	}
</script>