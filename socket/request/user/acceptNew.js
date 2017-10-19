const api = require(require('path').dirname(require.main.filename) + '/api');

module.exports = function (socket, io) {
    let module = {};

    module.listener = function (token, mail) {
        api.validateToken(token).then(function () {
            api.acceptNewUser(mail).then(function (result) {
                socket.emit('user/acceptNew', result);
                socket.broadcast.emit('user/acceptNew', result);
            }).catch(function (result) {
                socket.emit('user/acceptNew', result);
            });
        }).catch(function (result) {
            socket.emit('user/acceptNew', result);
        });
    };

    return module;
};