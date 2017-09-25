import Vue from 'vue';
import Vuex from 'vuex';
import SocketIO from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import MainVueComponent from '../components/main.vue';

const SocketIOInstance = SocketIO('http://box.boubou.io')

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        sidebar: {
            opened: false
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
    el: 'body',
    store,
    sockets: {
        connect: function () {
            console.log('socket connected');
        }
    },
    render: function (createElement) {
        return createElement(MainVueComponent);
	}
});