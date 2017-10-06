const environment = process.env.NODE_ENV || 'development';
const config = require('../db-config.js')[environment];
const knex = require('knex')(config);

const db = {
    widget: {},
    user: {},
    milight: {}
};

db.milight.setLightIntensity = function(light, value) {
    return knex
        .from('light')
        .innerJoin('bridge', 'bridge.id', 'light.router')
        .where({
            'light.zone': light.zone,
            'bridge.mac': light.bridge.mac
        })
        .update({
            'light.intensity': value
        });
}

db.widget.getAll = function () {
    return knex
        .from('widget')
        .leftOuterJoin('light', 'widget.id', 'light.widget_id')
        .innerJoin('bridge', 'bridge.id', 'light.router')
        .select('widget.id as id', 'widget.name as name', 'widget.type as type', 'light.type as light_type', 'light.zone as light_zone', 'light.intensity as light_intensity', 'light.power as light_power', 'bridge.mac as router_mac')
        .then(function (result) {
            result.forEach(function (element) {
                element.light = {
                    type: element.light_type,
                    zone: element.light_zone,
                    intensity: element.light_intensity,
                    power: element.light_power,
                    bridge: {
                        mac: element.router_mac
                    }
                };
                delete element.light_type;
                delete element.light_zone;
                delete element.light_intensity;
                delete element.light_power;
                delete element.router_mac;
            });

            return result;
        });
}

db.user.getByMail = function (mail) {
    return knex
        .from('user')
        .select('user.password as password')
        .where('user.mail', mail)
        .first()
}

module.exports = db;