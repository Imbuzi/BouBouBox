const api = require('../../api');

module.exports = function (socket, io) {
    let module = {};

    module.listener = function (data) {
        api.addUser(data.name, data.surname, data.mail, data.password).then(function (result) {
            socket.emit('addUser', result);
            socket.broadcast.emit('addUser', result);
        }).catch(function (result) {
            socket.emit('addUser', result);
        });
    };

    return module;
};