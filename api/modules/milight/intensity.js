const milight = require('node-milight-promise');
const api = {
    milight: {
        bridges: require(require('path').dirname(require.main.filename) + '/api/modules/milight/bridges')
    },
    db: {
        milight: {
            setLightIntensity: require(require('path').dirname(require.main.filename) + '/api/modules/db/milight/setLightIntensity')
        }
    }
}

module.exports = function (value, light) {
    return new Promise(function (resolve, reject) {
        let bridge = api.milight.bridges.list.filter(function (element) {
            return element.mac == light.bridge;
        })[0];

        if (bridge) {
            api.db.milight.setLightIntensity(light, value).then(function () {
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

                return null;
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