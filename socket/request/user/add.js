const api = require('../../../api');

module.exports = function (socket, io) {
    let module = {};

    module.listener = function (data) {
        api.addUser(data.name, data.surname, data.mail, data.password).then(function (result) {
            socket.emit('user/add', result);
            socket.broadcast.emit('user/add', result);
        }).catch(function (result) {
            socket.emit('user/add', result);
        });
    };

    return module;
};