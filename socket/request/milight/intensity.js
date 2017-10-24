const api = require(require('path').dirname(require.main.filename) + '/api');

// TODO : Remove console.log
module.exports = function (socket, io) {
    let module = {};

    module.listener = function (token, data) {
        api.validateToken(token).then(function () {
            api.milight.intensity(data.value, data.light).then(function (result) {
                socket.broadcast.emit('milight/intensity', result);
            }).catch(function (error) {
                console.log(error);
            });
        }).catch(function (result) {
            console.log(result);
        });
    };

    return module;
};