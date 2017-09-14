const http = require('http');
const https = require('https');
const fs = require('fs');
const express = require('express');
const helmet = require('helmet');
const milight = require('node-milight-promise');

// Déclaration application Express + Middlewares et configurations
const app = express();
app.use(helmet());

// Redirection HTTP 301 en HTTPS
http.createServer(function(req, res) {   
        res.writeHead(301, {"Location": "https://" + req.headers['host'] + req.url});
        res.end();
}).listen(3000);
console.log("Serveur HTTP de redirection en écoute ...");

// Routage Express
app.get('/',function(req, res) {
    res.send('Hello World !');
});

app.get('/salon',function(req, res) {
	
	milight.discoverBridges({
		type: 'all'
	}).then(function (results) {
		results.forEach(function(element) {
			var bridge = new milight.MilightController({
				ip: element.ip,
				type: element.type
			});
			
			var zone = 4;
			const commands = milight.commandsV6;
			
			bridge.sendCommands(commands.rgbw.on(zone));
			bridge.pause(1000);
			bridge.sendCommands(commands.rgbw.off(zone));
			bridge.close().then(function () {
				res.send("Command executed, closing bridge.");
			});
		});
	});
});

app.get('/link/:bridge/:zone',function(req, res) {
	
	var zone = req.params.zone;
	var bridge = req.params.bridge;
	
	console.log('zone :' + zone + '\nbridge number :' + bridge);
	
	milight.discoverBridges({
		type: 'all'
	}).then(function (results) {
		var bridge = new milight.MilightController({
			ip: results[0].ip,
			type: results[0].type
		});
		
		const commands = milight.commandsV6;
		
		bridge.sendCommands(commands.rgbw.link(zone));
		bridge.pause(5000);
		bridge.sendCommands(commands.rgbw.on(zone), commands.rgbw.whiteMode(zone), commands.rgbw.brightness(zone, 100));
		bridge.pause(1000);
		bridge.close().then(function () {
			res.send("Command executed, closing bridge.");
		});
	});
});

// Création du serveur HTTPS (certificats compris)
https.createServer({ 
        key: fs.readFileSync("/etc/letsencrypt/live/box.boubou.io/privkey.pem"),
        cert: fs.readFileSync("/etc/letsencrypt/live/box.boubou.io/fullchain.pem"),
        ca: fs.readFileSync("/etc/letsencrypt/live/box.boubou.io/chain.pem")
}, app).listen(4000);
console.log("Serveur HTTPS en écoute ...");
