const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[environment];
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

db.milight.setLightPower = function (light, value) {
    return knex
        .from('light')
        .innerJoin('bridge', 'bridge.id', 'light.router')
        .where({
            'light.zone': light.zone,
            'bridge.mac': light.bridge.mac
        })
        .update({
            'light.power': value
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
        .select('user.password as password','user.access as access')
        .where('user.mail', mail)
        .first()
}

db.user.getNotValidated = function () {
    return knex
        .from('user')
        .select('user.name as name', 'user.surname as surname', 'user.mail as mail')
        .where('user.access', 0)
}

db.user.delete = function (mail) {
    return knex
        .from('user')
        .where('user.mail', mail)
        .del()
}

db.user.acceptUser = function (mail) {
    return knex
        .from('user')
        .where('user.mail', mail)
        .update({
            'access': 1
        })
}

db.user.add = function (name, surname, mail, hashedPassword) {
    return knex
        .insert({ name: name, surname: surname, mail: mail, password: hashedPassword })
        .into('user')
}

module.exports = db;