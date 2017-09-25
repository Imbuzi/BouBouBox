const Vue = require('vue');
const Vuex = require('vuex');
const SocketIO = require('socket.io-client');
const MainVueComponent = require('../components/main.vue');

const SocketIOInstance = SocketIO('http://box.boubou.io')

Vue.prototype.$socket = SocketIOInstance;
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        sidebar: {
            opened: false
        }
    },
    mutations: {
        toggleSidebar (state) {
            state.sidebar.opened = !state.sidebar.opened;
        }
    }
})

const App = new Vue({
    el: 'body',
    render: function (createElement) {
        return createElement(MainVueComponent);
	}
});