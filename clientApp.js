<<<<<<< HEAD
import Vue from 'vue';
import Vuex from 'vuex';
import SocketIO from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import MainVueComponent from './components/main.vue';

document.addEventListener("DOMContentLoaded", function (event) {
=======
document.addEventListener("DOMContentLoaded", function (event) {
    import Vue from 'vue';
	import Vuex from 'vuex';
	import SocketIO from 'socket.io-client';
	import VueSocketIO from 'vue-socket.io';
	import MainVueComponent from 'components/main.vue';

>>>>>>> fcd4ade5097048123111d7facc61ef11d1cbdbc9
	const SocketIOInstance = SocketIO('http://box.boubou.io')

	Vue.use(Vuex);

	const store = new Vuex.Store({
		state: {
			sidebar: {
				opened: false,
				title: 'BouBouBox'
			},
			theme: {
				color: 'blue'
			}
		},
		mutations: {
			toggleSidebar(state) {
				state.sidebar.opened = !state.sidebar.opened;
			}
		}
	})

	Vue.use(VueSocketIO, SocketIOInstance, store);

	const App = new Vue({
		el: 'main',
		store,
		sockets: {},
		render: function (createElement) {
			return createElement(MainVueComponent);
		}
	});
});