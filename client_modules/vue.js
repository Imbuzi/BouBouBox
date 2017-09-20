const Vue = require('vue');
const VueSocketIO = require('vue-socket.io');
const MainVueComponent = require('../components/main.vue')

Vue.use(VueSocketIO, 'http://box.boubou.io');

const App = new Vue({
    el: 'body',
    render: function (createElement) {
		return createElement(MainVueComponent)
	}
});

console.log(App);