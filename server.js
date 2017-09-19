const http = require('http');
const fs = require('fs');
const express = require('express');
const milight = require('node-milight-promise');
const path = require('path');
const morgan = require('morgan'); // Charge le middleware de logging
const app = express();

// Redirection HTTP
const server = http.createServer(app).listen(3000);
console.log("Serveur HTTP en écoute ...");

// Middlewares et configurations
//app.use(morgan('combined'));
app.use(express.static(__dirname + '/public'))

// Routage Express
app.get('/',function(req, res) {
    res.sendFile('./app.html', {root: __dirname });
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

// Création du WS Socket.io
const io = require('socket.io')(server);
io.on('connection', function(socket) {
	console.log(`User with id ${socket.id} connected`);
	socket.on('disconnect', function() {
		console.log(`User with id ${socket.id} disconnected`);
	});
});
