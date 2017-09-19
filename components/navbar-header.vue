<template>
	<div class="navbar-header">
		<a class="navbar-toggle collapsed" v-on:click.prevent="" href="#" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false"></a>
		<a class="bars" v-on:click.prevent="" href="#" ></a>
		<a class="navbar-brand" v-on:click.prevent="" href="#">{{title}}</a>
	</div>
</template>

<script>
	module.exports = {
		props: ['title']
	}
</script>