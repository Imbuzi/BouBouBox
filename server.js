const http = require('http');
const https = require('https');
const fs = require('fs');
const express = require('express');
const helmet = require('helmet');

// Déclaration application Express + Middlewares
const app = express();
app.use(helmet());

// Redirection HTTP 301 en HTTPS
http.createServer(function(req, res) {   
        res.writeHead(301, {"Location": "https://" + req.headers['host'] + req.url});
        res.end();
}).listen(3000);

// Routage Express
app.get('/hello-world',function(req, res) {
	res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World !');
});

// Création du serveur HTTPS (certificats compris)
https.createServer({ 
        key: fs.readFileSync("/etc/letsencrypt/live/box.boubou.io/privkey.pem"),
        cert: fs.readFileSync("/etc/letsencrypt/live/box.boubou.io/fullchain.pem"),
        ca: fs.readFileSync("/etc/letsencrypt/live/box.boubou.io/chain.pem")
}, app).listen(4000);
