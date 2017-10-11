const http = require('http');
const bodyParser = require("body-parser");
const express = require('express');
const path = require('path');
const morgan = require('morgan'); // Charge le middleware de logging
const api = require('./api/functions.js');
const app = express();

const preInitPromises = [
    api.milight.discoverBridges()
];

// Bodyparser
app.use(bodyParser.json());

// Middlewares et configurations
//app.use(morgan('combined'));
app.use(express.static(__dirname + '/public'))

// Création serveur HTTP
const server = http.createServer(app)

// Ecoute serveur HTTP après initialisation de l'API Milight
Promise.all(preInitPromises).then(function () {
    server.listen(3000);
    console.log("Serveur HTTP en écoute ...");
}).catch(function () {
    console.log("Serveur HTTP hors service : erreur lors de l'initialisation ...");
});

// Routage Express
app.get('/widget', (req, res) => {
    api.authenticateXMLHttpRequest(req).then(function () {
        api.getWidgetList().then(function (result) {
            res.json(result);
        }).catch(function (error) {
            res.status(error.error).json(error);
        });
    }).catch(function (error) {
        res.status(error.error).json(error);
    });
})

app.post("/login", function (req, res) {
    api.getJWT(req.body.mail, req.body.password).then(function (result) {
        res.json(result);
    }).catch(function (result) {
        res.status(result.error).json(result);
    });
});

app.get('*', function (req, res) {
    res.sendFile('./app.html', { root: __dirname });
});

// Création du WS Socket.io
// TODO : API socket dans un autre fichier
const io = require('socket.io')(server);
io.on('connection', function(socket) {
    socket.on('getWidgetList', function (token) {
        api.validateToken(token).then(function () {
            api.getWidgetList().then(function (result) {
                socket.emit('widgetList', result);
            }).catch(function (error) {
                socket.emit('widgetList', result);
            });
        }).catch(function (result) {
            socket.emit('widgetList', result);
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
