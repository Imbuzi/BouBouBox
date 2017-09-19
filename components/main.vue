<template>
  <body class="theme-{{color}}">
    <navbar></navbar>
  </body>
</template>

<script>
	var NavBar = require('./navbar.vue');

	module.exports = {
    data: function() {
      return {
        'color': 'blue'
      }
    },
		components: {
			'navbar': NavBar
		}
	}
</script>