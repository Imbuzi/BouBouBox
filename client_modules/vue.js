const Vue = require('vue');
const SocketIOClient = require('socket.io-client');
const VueSocketIO = require('vue-socket.io');
const MainVueComponent = require('../components/main.vue');

Vue.use(VueSocketIO, SocketIOClient('http://box.boubou.io'));

const App = new Vue({
    el: 'body',
    render: function (createElement) {
        return createElement(MainVueComponent);
	}
});