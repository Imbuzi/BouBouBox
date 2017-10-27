const milight = require('node-milight-promise');

module.exports = {
    list: [],
    init: function() {
        return new Promise(function (resolve, reject) {
            if (process.env.NODE_ENV == "development") {
                let bridge = new milight.MilightController({
                    ip: '192.168.1.255',
                    type: 'legacy'
                });
                bridge.mac = 'FF:FF:FF:FF:FF:FF';

                console.log("[MILIGHT] Creating fake bridge to send commands");
                module.exports.list.push(bridge);

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
                        module.exports.list.push(bridge);
                    });
                }).then(function () {
                    resolve();
                }).catch(function () {
                    reject();
                });
            }
        });
    }
}