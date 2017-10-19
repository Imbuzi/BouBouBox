const api = require('../../api');

module.exports = function (socket, io) {
    let module = {};

    module.listener = function (token, mail) {
        api.validateToken(token).then(function () {
            api.refuseNewUser(mail).then(function (result) {
                socket.emit('refuseNewUser', result);
                socket.broadcast.emit('refuseNewUser', result);
            }).catch(function (result) {
                socket.emit('refuseNewUser', result);
            });
        }).catch(function (result) {
            socket.emit('refuseNewUser', result);
        });
    };

    return module;
};