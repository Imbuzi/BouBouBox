<template>
	<div class="collapse navbar-collapse" id="navbar-collapse">
		<ul class="nav navbar-nav navbar-right">
			<li class="pull-right"><a href="#" v-on:click.prevent="" class="js-right-sidebar" data-close="true"><i class="material-icons">menu</i></a></li>
		</ul>
	</div>
</template>

<script>
	module.exports = {
    props: ['count']
  }
</script>