<template>
    <nav class="navbar">
        <div class="container-fluid">
            <navbar-header title="Titre de test"></navbar-header>
        </div>
    </nav>
</template>

<script>
	var NavBarHeader = require('./navbar-header.vue');

	module.exports = {
		components: {
			'navbar-header': NavBarHeader
		}
	}
</script>