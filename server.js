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
const passwordHash = require('password-hash');

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

// API JWT
function getJWTAPI(mail, password) {
    return new Promise(function (resolve, reject) {
        if (!mail || !password) {
            reject({
                error: 400,
                message: "Erreur de requête"
            });
        } else {
            db.user.getByMail(mail).then(function (user) {
                if (!user) {
                    reject({
                        error: 401,
                        message: "Utilisateur inexistant"
                    });
                } else {
                    if (passwordHash.verify(password, user.password)) {
                        let payload = { mail: user.mail };
                        let cert = fs.readFileSync('./private.key');
                        let token = jwt.sign(payload, cert, { algorithm: 'RS256' }, function (err, token) {
                            if (err) {
                                reject({
                                    error: 500,
                                    message: "Erreur de chiffrement du token"
                                });
                            } else {
                                resolve({
                                    token: token
                                });
                            }
                        });
                    } else {
                        reject({
                            error: 401,
                            message: "Mot de passe erroné"
                        });
                    }
                }
            });
        }
    });
}

// API widget
function getWidgetListAPI(token) {
    return new Promise(function (resolve, reject) {
        var cert = fs.readFileSync('./public/key/public.pem');
        jwt.verify(token, cert, { algorithms: ['RS256'] }, function (err, decoded) {
            if (err) {
                reject({
                    error: 401,
                    message: "Erreur d'authentification (token invalide)"
                });
            } else {
                db.widget.getAll().then(function (widgetList) {
                    resolve({
                        widgetList: widgetList
                    });
                }).catch(function (error) {
                    reject({
                        error: 500,
                        message: "Erreur de base de données"
                    });
                });
            }
        });
    });
    var cert = fs.readFileSync('./public/key/public.pem');
    jwt.verify(token, cert, { algorithms: ['RS256'] }, function (err, decoded) {
        if (err) {
            return {
                error: true,
                message: "Erreur d'authentification (token invalide)"
            }
        } else {
            return db.widget.getAll();
        }
    });
}

// Routage Express
app.get('/widget', (req, res) => {
    console.log(req.get('Authentication'));
    getWidgetListAPI().then(function (result) {
        res.json(result);
    }).catch(function (error) {
        res.status(result.error).json(result);
    });
})

app.post("/login", function (req, res) {
    getJWTAPI(req.body.mail, req.body.password).then(function (result) {
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
    console.log(`User with id ${socket.id} connected`);

    socket.on('getWidgetList', function () {
        getWidgetListAPI().then(function (result) {
            socket.emit('widgetList', result);
        }).catch(function (result) {
            socket.emit('widgetList', result);
        });
    });

    socket.on('getJWT', function (data) {
        getJWTAPI(data.mail, data.password).then(function (result) {
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
	socket.on('disconnect', function() {
		console.log(`User with id ${socket.id} disconnected`);
    });
});
