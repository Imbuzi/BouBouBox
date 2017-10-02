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

    bridge.sendCommands(commands.rgbw.brightness(zone, value));
    bridge.pause(1000);
}

module.exports = exp;