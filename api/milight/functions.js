const milight = require('node-milight-promise');
const db = require('../../model/db.js');

let api = {};

api.discoverBridges = function () {
    return new Promise(function (resolve, reject) {
        api.bridges = [];
        milight.discoverBridges({
            type: 'all'
        }).then(function (results) {
            results.forEach(function (element) {
                let bridge = new milight.MilightController({
                    ip: element.ip,
                    type: element.type
                });
                bridge.mac = element.mac;
                api.bridges.push(bridge);
            });
        }).then(function () {
            resolve();
        }).catch(function() {
            reject();
        });
    });
}

api.setLightIntensity = function (value, light) {
    return new Promise(function (resolve, reject) {
        let bridge = api.bridges.filter(function (element) {
            return element.mac == light.bridge.mac;
        })[0];

        if (bridge) {
            db.milight.setLightIntensity(light, value).then(function () {
                let commands = bridge.type == 'v6' ? milight.commandsV6 : milight.commands2;

                bridge.sendCommands(commands.rgbw.brightness(light.zone, value));
                bridge.pause(100);

                resolve({
                    light: light,
                    value: value
                });
            }).catch(function () {
                reject({
                    error: 500,
                    message: "Erreur de base de donn�es"
                });
            });
        } else {
            reject({
                error: 500,
                message: "Routeur Milight introuvable"
            });
        };
    });
};

module.exports = api;