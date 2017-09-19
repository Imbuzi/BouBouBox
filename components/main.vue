<template>
  <body>
    <navbar></navbar>
  </body>
</template>

<script>
	var NavBar = require('./navbar.vue');

	module.exports = {
		components: {
			'navbar': NavBar
		}
	}
</script>