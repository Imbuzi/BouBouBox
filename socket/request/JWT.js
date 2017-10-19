const api = require(require('path').dirname(require.main.filename) + '/api');

module.exports = function (socket, io) {
    let module = {};

    module.listener = function (data) {
        api.getJWT(data.mail, data.password).then(function (result) {
            socket.emit('JWT', result);
        }).catch(function (result) {
            socket.emit('JWT', result);
        });
    };

    return module;
};