<template>
    <nav class="navbar">
        <div class="container-fluid">
            <navbar-header></navbar-header>
        </div>
    </nav>
</template>

<script>
	import NavBarHeader from './navbar-header.vue';

	export default {
		components: {
			'navbar-header': NavBarHeader
		},
    methods: {}
	}
</script>