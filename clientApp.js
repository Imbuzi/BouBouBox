import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Lodash from 'lodash'
import VueLodash from 'vue-lodash'
import VueLocalStorage from 'vue-localstorage'
import SocketIO from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import IndexVueComponent from './components/index.vue';

import store from './store';
import router from './router';

document.addEventListener("DOMContentLoaded", function (event) {
	const SocketIOInstance = SocketIO('http://box.boubou.io')

	Vue.use(VueSocketIO, SocketIOInstance, store);
    Vue.use(VueLocalStorage);
    Vue.use(VueLodash, Lodash);

	const App = new Vue({
		el: 'main',
        store,
        router,
		sockets: {},
		render: function (createElement) {
            return createElement(IndexVueComponent);
		}
	});
});