#!/usr/bin/node
const http = require('http');
const bodyParser = require("body-parser");
const express = require('express');
const api = require('./api');
const app = express();

const preInitPromises = [
    api.milight.discoverBridges()
];

// Middlewares et configurations
app.use(bodyParser.json());
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

// REST API
const RESTAPI = require('./rest')(app);

console.log(app._router.stack);

// Static file serving
app.get('*', function (req, res) {
    if (process.env.NODE_ENV == 'production') {
        res.sendFile('./app-prod.html', { root: __dirname });
    } else {
        res.sendFile('./app.html', { root: __dirname });
    }
});

// Socket.io API
const io = require('socket.io')(server);
const socketAPI = require('./socket')(io);
socketAPI.listen();