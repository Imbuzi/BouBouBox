import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Lodash from 'lodash';
import VueLodash from 'vue-lodash';
import VueLocalStorage from 'vue-localstorage';
import VueSessionStorage from 'vue-sessionstorage';
import SocketIO from 'socket.io-client';
import VueSocketIO from 'vue-socket.io

Vue.use(VueSocketIO, SocketIOInstance, store);
Vue.use(VueLocalStorage);
Vue.use(VueSessionStorage);
Vue.use(VueLodash, Lodash);

import IndexVueComponent from './components/index.vue';

import store from './store';
import router from './router';

let SocketIODomain = 'http://box.boubou.io'
if (process.env.NODE_ENV == 'development') {
    SocketIODomain = 'http://localhost:3000'
}

const SocketIOInstance = SocketIO(SocketIODomain)

document.addEventListener("DOMContentLoaded", function (event) {
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