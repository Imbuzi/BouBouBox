<template>
    <nav class="navbar">
        <div class="container-fluid">
            <navbar-header v-bind:title="title"></navbar-header>
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
    methods: {}
	}
</script>