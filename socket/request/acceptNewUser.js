const api = require('../../api');

module.exports = function (socket, io) {
    let module = {};

    module.listener = function (token, mail) {
        api.validateToken(token).then(function () {
            api.acceptNewUser(mail).then(function (result) {
                socket.emit('acceptNewUser', result);
                socket.broadcast.emit('acceptNewUser', result);
            }).catch(function (result) {
                socket.emit('acceptNewUser', result);
            });
        }).catch(function (result) {
            socket.emit('acceptNewUser', result);
        });
    };

    return module;
};