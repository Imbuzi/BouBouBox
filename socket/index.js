const normalizedPath = require("path").join(__dirname, "request");
const requests = {};

require("fs").readdirSync(normalizedPath).forEach(function (file) {
    let name = file.replace(/\.[^/.]+$/, "");
    requests[name] = require("./request/" + file);
});

// TODO : Remove API
const api = require('../api');

module.exports = function (io) {
    let module = {};

    module.listen = function () {
        io.on('connection', function (socket) {

            if (process.env.NODE_ENV != 'production') {
                console.log('[SOCKET.IO] User connected with ID ' + socket.id);
            }

            Object.keys(requests).forEach(function (key) {
                console.log(key);
                console.log(requests.key);
                socket.on(key, requests[key]);
            });

            socket.on('refuseNewUser', function (token, mail) {
                api.validateToken(token).then(function () {
                    api.refuseNewUser(mail).then(function (result) {
                        socket.emit('userRefused', result);
                        socket.broadcast.emit('userRefused', result);
                    }).catch(function (result) {
                        socket.emit('userRefused', result);
                    });
                }).catch(function (result) {
                    socket.emit('userRefused', result);
                });
            });

            socket.on('acceptNewUser', function (token, mail) {
                api.validateToken(token).then(function () {
                    api.acceptNewUser(mail).then(function (result) {
                        socket.emit('userAccepted', result);
                        socket.broadcast.emit('userAccepted', result);
                    }).catch(function (result) {
                        socket.emit('userAccepted', result);
                    });
                }).catch(function (result) {
                    socket.emit('userRefused', result);
                });
            });

            socket.on('getUsersWaitingForValidation', function (token) {
                api.validateToken(token).then(function () {
                    api.getUsersWaitingForValidation().then(function (result) {
                        socket.emit('usersWaitingForValidation', result);
                    }).catch(function (result) {
                        socket.emit('usersWaitingForValidation', result);
                    });
                }).catch(function (result) {
                    socket.emit('usersWaitingForValidation', result);
                });
            });

            socket.on('getJWT', function (data) {
                api.getJWT(data.mail, data.password).then(function (result) {
                    socket.emit('JWT', result);
                }).catch(function (result) {
                    socket.emit('JWT', result);
                });
            });

            socket.on('addUser', function (data) {
                api.addUser(data.name, data.surname, data.mail, data.password).then(function (result) {
                    socket.emit('userAdded', result);
                    socket.broadcast.emit('userAdded', result);
                }).catch(function (result) {
                    socket.emit('userAdded', result);
                });
            });

            socket.on('setLightIntensity', function (token, data) {
                api.validateToken(token).then(function () {
                    api.milight.setLightIntensity(data.value, data.light).then(function (result) {
                        socket.broadcast.emit('lightIntensity', result);
                    }).catch(function (error) {
                        console.log(error);
                    });
                }).catch(function (result) {
                    console.log(result);
                });
            });

            socket.on('setLightColor', function (token, data) {
                api.validateToken(token).then(function () {
                    api.milight.setLightColor(data.value, data.light).then(function (result) {
                        console.log(result);
                    }).catch(function (error) {
                        console.log(error);
                    });
                }).catch(function (result) {
                    console.log(result);
                });
            });

            socket.on('setLightPower', function (token, data) {
                api.validateToken(token).then(function () {
                    api.milight.setLightPower(data.value, data.light).then(function (result) {
                        socket.broadcast.emit('lightPower', result);
                    }).catch(function (error) {
                        console.log(error);
                    });
                }).catch(function (result) {
                    console.log(result);
                });
            });
        });
    }

    return module;
};