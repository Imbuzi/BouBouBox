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

module.exports = exp;