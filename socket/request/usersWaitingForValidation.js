const api = require('../../api');

module.exports = function (socket, io) {
    let module = {};

    module.listener = function (token) {
        api.validateToken(token).then(function () {
            api.getUsersWaitingForValidation().then(function (result) {
                socket.emit('usersWaitingForValidation', result);
            }).catch(function (result) {
                socket.emit('usersWaitingForValidation', result);
            });
        }).catch(function (result) {
            socket.emit('usersWaitingForValidation', result);
        });
    };

    return module;
};