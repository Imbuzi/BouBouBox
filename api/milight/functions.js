const milight = require('node-milight-promise');

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
            let commands = bridge.type == 'v6' ? milight.commandsV6 : milight.commands2;

            bridge.sendCommands(commands.rgbw.brightness(light.zone, value));
            bridge.pause(100);

            resolve();
        } else {
            reject({
                error: 500,
                message: "Routeur Milight introuvable"
            });
        };
    });
};

module.exports = api;