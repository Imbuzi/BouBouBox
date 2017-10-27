const milight = require('node-milight-promise');
const api = {
    milight: {
        bridges: require(require('path').dirname(require.main.filename) + '/api/modules/milight/bridges')
    }
}

module.exports = function (value, light) {
    return new Promise(function (resolve, reject) {
        let bridge = api.milight.bridges.list.filter(function (element) {
            return element.mac == light.bridge;
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