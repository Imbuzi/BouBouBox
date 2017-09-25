const Vue = require('vue');
const Vuex = require('vuex');
const SocketIO = require('socket.io-client');
const VueSocketIO = require('vue-socket.io');
const MainVueComponent = require('../components/main.vue');

const SocketIOInstance = SocketIO('http://box.boubou.io')

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
Vue.use(Vuex);

const App = new Vue({
    el: 'body',
    store,
    render: function (createElement) {
        return createElement(MainVueComponent);
	}
});