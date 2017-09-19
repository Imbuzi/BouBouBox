const Vue = require('vue');
const NavbarComponent = require('../components/navbar.vue')

new Vue({
    el: 'nav',
    render: function (createElement) {
		return createElement(NavbarComponent)
	}
});