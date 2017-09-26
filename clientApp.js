import Vue from 'vue';
import Vuex from 'vuex';
import SocketIO from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import Store from './store';
import MainVueComponent from './components/main.vue';

document.addEventListener("DOMContentLoaded", function (event) {
	const SocketIOInstance = SocketIO('http://box.boubou.io')

	Vue.use(VueSocketIO, SocketIOInstance, store);

	const App = new Vue({
		el: 'main',
		Store,
		sockets: {},
		render: function (createElement) {
			return createElement(MainVueComponent);
		}
	});
});