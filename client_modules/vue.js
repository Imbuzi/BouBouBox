const Vue = require('vue');
const SocketIOClient = require('socket.io-client');
const VueSocketIO = require('vue-socket.io');
const SocketInstance = SocketIOClient('http://box.boubou.io');
const MainVueComponent = require('../components/main.vue');

Vue.use(VueSocketIO, SocketInstance);

console.log("Fichier : main.vue");
console.log(MainVueComponent.$socket);
console.log(MainVueComponent.$root.$socket);

const App = new Vue({
    el: 'body',
    render: function (createElement) {
        return createElement(
            MainVueComponent, {
                'data': {
                    '$socket': this.$socket
                }
            }
        );
	}
});