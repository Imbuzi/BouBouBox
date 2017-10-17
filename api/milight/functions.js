const milight = require('node-milight-promise');
const db = require('../../model/db.js');

let api = {};

api.discoverBridges = function () {
    return new Promise(function (resolve, reject) {
        api.bridges = [];

        if (process.env.NODE_ENV == "development") {
            let bridge = new milight.MilightController({
                ip: '0.0.0.0',
                type: 'legacy'
            });
            bridge.mac = 'FF:FF:FF:FF:FF:FF';

            console.log("Creating fake bridge to send commands");
            api.bridges.push(bridge);

            resolve();
        } else {
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
            }).catch(function () {
                reject();
            });
        }
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

                if (process.env.NODE_ENV != "production") {
                    console.log("Setting light intensity : ");
                    console.log(light);
                    console.log("Intensity set : " + value);
                }

                resolve({
                    light: light,
                    value: value
                });
            }).catch(function () {
                reject({
                    error: 500,
                    message: "Erreur de base de données"
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

api.setLightColor = function (value, light) {
    return new Promise(function (resolve, reject) {
        let bridge = api.bridges.filter(function (element) {
            return element.mac == light.bridge.mac;
        })[0];

        if (bridge) {
            let commands = bridge.type == 'v6' ? milight.commandsV6 : milight.commands2;

            bridge.sendCommands(commands.rgbw.rgb(light.zone, value.red, value.green, value.blue));
            bridge.pause(100);

            if (process.env.NODE_ENV != "production") {
                console.log("Setting light color : ");
                console.log(light);
                console.log("Color set : " + value);
            }

            resolve({
                light: light,
                value: value
            });
        } else {
            reject({
                error: 500,
                message: "Routeur Milight introuvable"
            });
        };
    });
};

api.setLightPower = function (value, light) {
    return new Promise(function (resolve, reject) {
        let bridge = api.bridges.filter(function (element) {
            return element.mac == light.bridge.mac;
        })[0];

        if (bridge) {
            db.milight.setLightPower(light, value).then(function () {
                let commands = bridge.type == 'v6' ? milight.commandsV6 : milight.commands2;

                if (value) {
                    bridge.sendCommands(commands.rgbw.on(light.zone));
                } else {
                    bridge.sendCommands(commands.rgbw.off(light.zone));
                }
                bridge.pause(100);

                if (process.env.NODE_ENV != "production") {
                    console.log("Setting light power : ");
                    console.log(light);
                    console.log("Power set : " + value);
                }

                resolve({
                    light: light,
                    value: value
                });
            }).catch(function () {
                reject({
                    error: 500,
                    message: "Erreur de base de données"
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