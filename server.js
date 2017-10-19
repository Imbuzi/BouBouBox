#!/usr/bin/node
const http = require('http');
const bodyParser = require("body-parser");
const express = require('express');
const path = require('path');
const morgan = require('morgan'); // Charge le middleware de logging
const api = require('./api');
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
    console.log("[EXPRESS] HTTP server listening ...");
}).catch(function () {
    console.log("[EXPRESS] HTTP server start script failed : init error ...");
});

// Routage Express
app.get('/widget', (req, res) => {
    api.authenticateXMLHttpRequest(req).then(function () {
        api.getWidgetList().then(function (widgetList) {
            res.json(widgetList);
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
    if (process.env.NODE_ENV == 'production') {
        res.sendFile('./app-prod.html', { root: __dirname });
    } else {
        res.sendFile('./app.html', { root: __dirname });
    }
});

// Création du WS Socket.io
const io = require('socket.io')(server);
const socketAPI = require('./socket')(io);
socketAPI.listen();