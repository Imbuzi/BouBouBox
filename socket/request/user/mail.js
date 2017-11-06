const api = require(require('path').dirname(require.main.filename) + '/api');

module.exports = function (socket, io) {
    let module = {};

    module.listener = function (token) {
        api.validateToken(token).then(function () {
            api.getMail(token).then(function (result) {
                socket.emit('user/mail', result);
            }).catch(function (result) {
                socket.emit('user/mail', result);
            });
        }).catch(function (result) {
            socket.emit('user/mail', result);
        });
    };

    return module;
};