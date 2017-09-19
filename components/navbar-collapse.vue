<template>
	<div class="collapse navbar-collapse" id="navbar-collapse">
		<ul class="nav navbar-nav navbar-right">
			<li class="dropdown">
				<a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button">
					<i class="material-icons">notifications</i>
					<span class="label-count">{{count}}</span>
				</a>
			</li>
			<li class="pull-right"><a href="javascript:void(0);" class="js-right-sidebar" data-close="true"><i class="material-icons">more_vert</i></a></li>
		</ul>
	</div>
</template>

<script>
	module.exports = {
    props: ['count']
  }
</script>