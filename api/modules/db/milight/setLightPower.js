const environment = process.env.NODE_ENV || 'development';
const config = require(require('path').dirname(require.main.filename) + '/knexfile.js')[environment];
const knex = require('knex')(config);

module.exports = function (light, value) {
    console.log(light);
    console.log(value);
    return knex
        .from('widget_milight')
        .where({
            'zone': light.zone,
            'bridge': light.bridge
        })
        .update({
            'power': value
        });
}