const environment = process.env.NODE_ENV || 'development';
const config = require(require('path').dirname(require.main.filename) + '/knexfile.js')[environment];
const knex = require('knex')(config);

let milight = {};

milight.setLightIntensity = function (light, value) {
    return knex
        .from('light')
        .where({
            'zone': light.zone,
            'bridge.mac': light.bridge
        })
        .update({
            'intensity': value
        });
}

milight.setLightPower = function (light, value) {
    return knex
        .from('milight')
        .where({
            'zone': light.zone,
            'bridge': light.bridge
        })
        .update({
            'power': value
        });
}

module.exports = milight;