<template>
    <nav class="navbar">
        <div class="container-fluid">
            <navbar-header title="Titre de test"></navbar-header>
            <navbar-collapse count="99"></navbar-collapse>
        </div>
    </nav>
</template>

<script>
	var NavBarHeader = require('./navbar-header.vue');
	var NavBarCollapse = require('./navbar-collapse.vue');

	module.exports = {
		components: {
			'navbar-header': NavBarHeader,
			'navbar-collapse': NavBarCollapse
		}
	}
</script>