const milight = require('node-milight-promise');

exp.createBridges = function () {
    let bridges = [];
    milight.discoverBridges({
        type: 'all'
    }).then(function (results) {
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

module.exports = exp;