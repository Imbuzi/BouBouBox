const Vue = require('vue');
const SocketIO = require('socket.io-client');
const MainVueComponent = require('../components/main.vue');

const SocketIOInstance = SocketIO('http://box.boubou.io')

Vue.prototype.$socket = SocketIOInstance;

const App = new Vue({
    el: 'body',
    render: function (createElement) {
        return createElement(MainVueComponent);
	}
});