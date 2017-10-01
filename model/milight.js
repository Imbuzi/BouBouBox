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
    let commands = bridge.type == 'v6' ? milight.commandsV6 : milight.commands2;

    return bridge.ready().then(function () {
        return light.sendCommands(commands.rgbw.brightness(zone, value)).pause(100).close();
    });
}

module.exports = exp;