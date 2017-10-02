const milight = require('node-milight-promise');

let exp = {};

exp.createBridges = function () {
    return milight.discoverBridges({
        type: 'all'
    }).then(function (results) {
        let bridges = [];
        results.forEach(function (element) {
            let bridge = new milight.MilightController({
                ip: element.ip,
                type: element.type
            });
            bridge.mac = element.mac;
            bridges.push(bridge);
        });

        return bridges;
    });
}

exp.setLightIntensity = function (bridge, zone, value) {
    return new Promise((resolve, reject) => {
        let commands = bridge.type == 'v6' ? milight.commandsV6 : milight.commands2;

        bridge.sendCommands(commands.rgbw.brightness(zone, value));
        bridge.pause(100);
        resolve();
    });
}

exp.setLightPower = function (bridge, zone, value) {
    return new Promise((resolve, reject) => {
        let commands = bridge.type == 'v6' ? milight.commandsV6 : milight.commands2;

        if (value) {
            bridge.sendCommands(commands.rgbw.on(zone));
        } else {
            bridge.sendCommands(commands.rgbw.off(zone));
        }
        bridge.pause(100);
        resolve();
    });
}

module.exports = exp;