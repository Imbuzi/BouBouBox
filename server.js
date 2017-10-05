const http = require('http');
const bodyParser = require("body-parser");
const express = require('express');
const path = require('path');
const milight = require('./model/milight.js');
const morgan = require('morgan'); // Charge le middleware de logging
const api = require('./api/functions.js');
const app = express();

// Bodyparser
app.use(bodyParser.json());

// Middlewares et configurations
//app.use(morgan('combined'));
app.use(express.static(__dirname + '/public'))

// Ecoute serveur HTTP
const server = http.createServer(app).listen(3000);
console.log("Serveur HTTP en écoute ...");

// Init bridges list
let bridges = [];
milight.createBridges().then(function (value) {
    bridges = value;
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
const io = require('socket.io')(server);
io.on('connection', function(socket) {
    socket.on('getWidgetList', function (token) {
        api.getWidgetList(token).then(function (result) {
            socket.emit('widgetList', result);
        }).catch(function (result) {
            socket.emit('widgetList', result);
        });
    });
    socket.on('getJWT', function (data) {
        api.getJWT(data.mail, data.password).then(function (result) {
            socket.emit('JWT', result);
        }).catch(function (result) {
            socket.emit('JWT', result);
        });
    });

    socket.on('setLightIntensity', function (data) {
        console.log(data);
        let bridge = bridges.filter(function (element) {
            return element.mac == data.light.bridge.mac;
        })[0];

        if (typeof bridge !== "undefined") {
            milight.setLightIntensity(bridge, data.light.zone, data.value).then(function () {
                console.log('Command executed !');
            });
        } else {
            console.log('Error while setting light intensity : bridge undefined !');
        };
    });
    socket.on('setLightPower', function (data) {
        console.log(data);

        socket.broadcast.emit('updateLightPower', data);

        let bridge = bridges.filter(function (element) {
            return element.mac == data.light.bridge.mac;
        })[0];

        if (typeof bridge !== "undefined") {
            milight.setLightPower(bridge, data.light.zone, data.value).then(function () {
                console.log('Command executed !');
            });
        } else {
            console.log('Error while setting light power : bridge undefined !');
        };
    });
});
