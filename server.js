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

app.post("/login", function (req, res) {
    if (req.body.name && req.body.password) {
        let name = req.body.name;
        let password = req.body.password;

        getJWTAPI(name, password).then(function (result) {
            console.log(result);
            res.json(result);
        }).catch(function (result) {
            console.log(result);
            res.status(result.error).json(result);
        });
    }    
});

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

// API JWT
function getJWTAPI(name, password) {
    return new Promise(function (resolve, reject) {
        // Array temporaire avec infos des utilisateurs, stocké en BDD plus tard ...
        let users = [
            {
                id: 1,
                name: 'admin',
                password: 'admin'
            }
        ];
        let user = users.filter((element) => (element.name == name))[0];

        if (!user) {
            reject({
                error: 401,
                message: "User not found"
            });
        } else {
            if (user.password === password) {
                let payload = { id: user.id };
                let cert = fs.readFileSync('./private.key');
                let token = jwt.sign(payload, cert, { algorithm: 'RS256' }, function (err, token) {
                    if (err) {
                        reject({
                            error: 500,
                            message: "Token encryption error"
                        });
                    } else {
                        resolve({
                            error: false,
                            message: "Token retrieved",
                            token: token
                        });
                    }
                });
            } else {
                reject({
                    error: 401,
                    message: "Password mismatch"
                });
            }
        }
    });
}

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
