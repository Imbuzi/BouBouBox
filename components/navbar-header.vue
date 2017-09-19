<template>
	<div class="navbar-header">
		<a class="navbar-brand" v-on:click.prevent="" href="#">{{title}}</a>
    <ul class="right">
      <li>
        <a href="#" v-on:click.prevent="">
          <i class="material-icons">menu</i>
        </a>
      </li>
    </ul>
	</div>
</template>

<script>
	module.exports = {
		props: ['title']
	}
</script>