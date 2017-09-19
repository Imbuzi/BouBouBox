<template>
	<div class="navbar-header">
		<a class="bars" v-on:click.prevent="" href="#" ></a>
		<a class="navbar-brand" v-on:click.prevent="" href="#">{{title}}</a>
	</div>
</template>

<script>
	module.exports = {
		props: ['title']
	}
</script>