const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');
const milight = require('./model/milight.js');
const db = require('./model/db.js');
const morgan = require('morgan'); // Charge le middleware de logging
const app = express();

// Ecoute serveur HTTP
const server = http.createServer(app).listen(3000);
console.log("Serveur HTTP en écoute ...");

// Middlewares et configurations
//app.use(morgan('combined'));
app.use(express.static(__dirname + '/public'))

// Init bridges list
let bridges = [];
milight.createBridges().then(function (value) {
    bridges = value;
});

// Routage Express
app.get('/',function(req, res) {
    res.sendFile('./app.html', {root: __dirname});
});

// API widget
function getWidgetListAPI() {
    return db.widget.getAll().then(function (err, list) {
        if (err) {
            return null;
        } else {
            return list;
        }
    });
}

app.get('/widget', (req, res) => {
    getWidgetListAPI().then(function (widgetList) {
        if (widgetlist) {
            res.json(widgetlist);
        } else {
            res.status(500).send('Error, see server console');
        }
    });
})

// Création du WS Socket.io
const io = require('socket.io')(server);
io.on('connection', function(socket) {
    console.log(`User with id ${socket.id} connected`);

    socket.on('getWidgetList', function () {
        getWidgetListAPI().then(function (widgetList) {
            socket.emit('widgetList', widgetList);
        });
    });

    socket.on('setLightIntensity', function (data) {
        console.log(data);
        let bridge = bridges.filter(function (element) {
            return element.mac == data.room.router.mac;
        })[0];

        if (typeof bridge !== "undefined") {
            milight.setLightIntensity(bridge, data.room.zone, data.value).then(function () {
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
            return element.mac == data.room.router.mac;
        })[0];

        if (typeof bridge !== "undefined") {
            milight.setLightPower(bridge, data.room.zone, data.value).then(function () {
                console.log('Command executed !');
            });
        } else {
            console.log('Error while setting light power : bridge undefined !');
        };
    });
	socket.on('disconnect', function() {
		console.log(`User with id ${socket.id} disconnected`);
    });
});
