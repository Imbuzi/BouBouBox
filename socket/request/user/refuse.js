const api = require(require('path').dirname(require.main.filename) + '/api');

module.exports = function (socket, io) {
    let module = {};

    module.listener = function (token, mail) {
        api.validateToken(token).then(function () {
            api.refuseUser(mail).then(function (result) {
                socket.emit('user/refuse', result);
                socket.broadcast.emit('user/refuse', result);
            }).catch(function (result) {
                socket.emit('user/refuse', result);
            });
        }).catch(function (result) {
            socket.emit('user/refuse', result);
        });
    };

    return module;
};