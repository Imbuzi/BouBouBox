<template>
	<div class="navbar-header">
		<a class="navbar-brand" v-on:click.prevent="" href="#">{{title}}</a>
    <a href="#" v-on:click.prevent="" class="pull-right"><i class="material-icons">menu</i></a>
	</div>
</template>

<script>
	module.exports = {
		props: ['title']
	}
</script>