<template>
    <nav class="navbar">
        <div class="container-fluid">
            <navbar-header v-bind:title="title"></navbar-header>
        </div>
    </nav>
</template>

<script>
	import NavBarHeader from './navbar-header.vue';

	export default {
		props: ['title'],
		components: {
			'navbar-header': NavBarHeader
		},
    methods: {}
	}
</script>