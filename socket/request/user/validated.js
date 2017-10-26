const api = require(require('path').dirname(require.main.filename) + '/api');

module.exports = function (socket, io) {
    let module = {};

    module.listener = function (token, mail) {
        api.validateToken(token).then(function () {
            api.getUsersValidated().then(function (result) {
                socket.emit('user/validated', result);
            }).catch(function (result) {
                socket.emit('user/validated', result);
            });
        }).catch(function (result) {
            socket.emit('user/validated', result);
        });
    };

    return module;
};