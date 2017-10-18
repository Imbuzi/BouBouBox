const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[environment];
const knex = require('knex')(config);
const bookshelf = require('bookshelf')(knex);

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
        .select()
        .then(function (result) {
            return Promise.all(
                result.map(function (element) {
                    knex
                        .from('widget_' + element.widget_type)
                        .where('id', element.widget_type_id)
                        .select()
                        .first()
                        .then(function (subRes) {
                            element[element.widget_type] = subRes;
                        })
                }),result
            );
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