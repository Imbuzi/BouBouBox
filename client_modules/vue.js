const Vue = require('vue');
const SocketIOClient = require('socket.io-client');
const VueSocketIO = require('vue-socket.io');
const SocketInstance = SocketIOClient('http://box.boubou.io');
const MainVueComponent = require('../components/main.vue');

Vue.use(VueSocketIO, SocketInstance);

const App = new Vue({
    el: 'body',
    render: function (createElement) {
        return createElement(MainVueComponent, this.$socket);
	}
});