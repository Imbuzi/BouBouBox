const http = require('http');
const bodyParser = require("body-parser");
const fs = require('fs');
const express = require('express');
const path = require('path');
const milight = require('./model/milight.js');
const db = require('./model/db.js');
const morgan = require('morgan'); // Charge le middleware de logging
const app = express();
const jwt = require('jsonwebtoken');

// Bodyparser
app.use(bodyParser.json());

// Array temporaire avec infos des utilisateurs, stocké en BDD plus tard ...
let users = [
    {
        id: 1,
        name: 'admin',
        password: 'admin'
    }
];

app.post("/login", function (req, res) {
    console.log(req.body.name);
    console.log(req.body.password);
    if (req.body.name && req.body.password) {
        let name = req.body.name;
        let password = req.body.password;

        let user = users.filter((element) => (element.name == name))[0];
        if (!user) {
            res.status(401).json({
                error: true,
                message: "User not found"
            });
        }

        if (user.password === req.body.password) {
            let payload = { id: user.id };
            let cert = fs.readFileSync('./private.key');
            let token = jwt.sign(payload, cert, { algorithm: 'RS256' }, function (err, token) {
                if (err) {
                    res.status(500).json({
                        error: true,
                        message: "Token encryption error"
                    });
                } else {
                    res.json({
                        error: false,
                        message: "Token retrieved",
                        token: token
                    });
                }
            });
        } else {
            res.status(401).json({
                error: true,
                message: "Password mismatch"
            });
        }
    } else {
        res.status(400).json({
            error: true,
            message: "Bad request"
        });
    }
    
});

// Ecoute serveur HTTP
const server = http.createServer(app).listen(3000);
console.log("Serveur HTTP en écoute ...");

// Middlewares et configurations
//app.use(morgan('combined'));
app.use(express.static(__dirname + '/public'))
app.use(express.static('/public.pem'))

// Init bridges list
let bridges = [];
milight.createBridges().then(function (value) {
    bridges = value;
});

// API widget
function getWidgetListAPI() {
    return db.widget.getAll().then(function (list) {
        return list;
    }).catch(function (error) {
        return null;
    });
}

app.get('/widget', (req, res) => {
    getWidgetListAPI().then(function (widgetList) {
        if (widgetList) {
            res.json(widgetList);
        } else {
            res.status(500).send('Error, see server console');
        }
    });
})

// Routage Express
app.get('*', function (req, res) {
    res.sendFile('./app.html', { root: __dirname });
});

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
	socket.on('disconnect', function() {
		console.log(`User with id ${socket.id} disconnected`);
    });
});
