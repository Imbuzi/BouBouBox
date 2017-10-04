const http = require('http');
const bodyParser = require("body-parser");
const fs = require('fs');
const express = require('express');
const path = require('path');
const milight = require('./model/milight.js');
const db = require('./model/db.js');
const morgan = require('morgan'); // Charge le middleware de logging
const app = express();

/*
    --- TESTS JWT ---
*/

// Bodyparser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const jwt = require('jsonwebtoken');
//const passport = require("passport");
//const passportJWT = require("passport-jwt");

// Array temporaire avec infos des utilisateurs, stocké en BDD plus tard ...
var users = [
    {
        id: 1,
        name: 'admin',
        password: 'admin'
    }
];

/*var jwtOptions = {
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
};

var localArrayStrategy = new passportJWT.Strategy(jwtOptions, function (jwt_payload, next) {
    var user = users.filter((element) => (element.id == jwt_payload.id))[0];
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

passport.use(localArrayStrategy);
app.use(passport.initialize());*/

app.post("/login", function (req, res) {
    if (req.body.name && req.body.password) {
        var name = req.body.name;
        var password = req.body.password;
    }
    var user = users.filter((element) => (element.name == name))[0];
    if (!user) {
        res.status(401).json({ error: "USER_NOT_FOUND" });
    }

    if (user.password === req.body.password) {
        // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
        var payload = { id: user.id };
        var token = jwt.sign(payload, 'secret');
        res.json({ token: token });
    } else {
        res.status(401).json({ error: "PASSWORD_MISMATCH" });
    }
});
/*
    --- FIN DES TESTS JWT ---
*/

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
