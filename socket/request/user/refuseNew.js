const api = require('../../../api');

module.exports = function (socket, io) {
    let module = {};

    module.listener = function (token, mail) {
        api.validateToken(token).then(function () {
            api.refuseNewUser(mail).then(function (result) {
                socket.emit('user/refuseNew', result);
                socket.broadcast.emit('user/refuseNew', result);
            }).catch(function (result) {
                socket.emit('user/refuseNew', result);
            });
        }).catch(function (result) {
            socket.emit('user/refuseNew', result);
        });
    };

    return module;
};