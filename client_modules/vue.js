const Vue = require('vue');
const MainVueComponent = require('../components/main.vue')

const App = new Vue({
    el: 'body',
    render: function (createElement) {
		return createElement(MainVueComponent)
	}
});