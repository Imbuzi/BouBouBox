const api = require('../../../api');

module.exports = function (socket, io) {
    let module = {};

    module.listener = function (token) {
        api.validateToken(token).then(function () {
            api.getUsersWaitingForValidation().then(function (result) {
                socket.emit('user/waitingForValidation', result);
            }).catch(function (result) {
                socket.emit('user/waitingForValidation', result);
            });
        }).catch(function (result) {
            socket.emit('user/waitingForValidation', result);
        });
    };

    return module;
};