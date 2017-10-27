const milight = require('node-milight-promise');
const api = {
    milight: {
        bridges: require(require('path').dirname(require.main.filename) + '/api/modules/milight/bridges')
    },
    db: {
        milight: {
            setLightPower: require(require('path').dirname(require.main.filename) + '/api/modules/db/milight/setLightPower')
        }
    }
}

module.exports = function (value, light) {
    return new Promise(function (resolve, reject) {
        let bridge = api.milight.bridges.list.filter(function (element) {
            return element.mac == light.bridge;
        })[0];

        if (bridge) {
            api.db.milight.setLightPower(light, value).then(function () {
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

                return null;
            }).catch(function (error) {
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