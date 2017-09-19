<template>
	<div class="collapse navbar-collapse" id="navbar-collapse">
		<ul class="nav navbar-nav navbar-right">
			<li class="dropdown">
				<a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button">
					<i class="material-icons">notifications</i>
					<span v-if="count" class="label-count">{{count}}</span>
				</a>
        <ul class="dropdown-menu">
          <li>
            <a href="#">Action</a>
          </li>
          <li>
            <a href="#">Separated link</a>
          </li>
          <li role="separator" class="divider"></li>
        </ul>
			</li>
			<li class="pull-right"><a href="#" v-on:click.prevent class="js-right-sidebar" data-close="true"><i class="material-icons">menu</i></a></li>
		</ul>
	</div>
</template>

<script>
	module.exports = {
    props: ['count']
  }
</script>