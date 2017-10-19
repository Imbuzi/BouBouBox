const api = require(require('path').dirname(require.main.filename) + '/api');

module.exports = function (socket, io) {
    let module = {};

    module.listener = function (token) {
        api.validateToken(token).then(function () {
            api.getWidgetList().then(function (widgetList) {
                socket.emit('widgetList', widgetList);
            }).catch(function (error) {
                socket.emit('widgetList', error);
            });
        }).catch(function (result) {
            socket.emit('widgetList', result);
        });
    };

    return module;
};