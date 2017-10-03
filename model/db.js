const environment = process.env.NODE_ENV || 'development';
const config = require('../db-config.js')[environment];
const knex = require('knex')(config);

console.log(config);

const db = {
    panel: {},
    room: {},
    bridge: {},
    widget: {}
};

db.panel.getAll = () => knex.select().from('panel');

db.room.getAll = function () {
    return knex
        .from('room')
        .innerJoin('bridge', 'room.router', 'bridge.id')
        .select('room.id as id', 'room.name as name', 'room.zone as zone', 'room.type as type', 'bridge.mac as router_mac', 'bridge.name as router_name')
        .then(function (result) {
            result.forEach(function (element) {
                element.router = {
                    name: element.router_name,
                    mac: element.router_mac
                };
                delete element.router_name;
                delete element.router_mac;
            });

            return result;
        });
}

db.widget.getAll = function () {
    return knex
        .from('widget')
        .leftOuterJoin('room', 'widget.id', 'room.widget_id')
        .select('widget.id as id', 'widget.name as name', 'widget.type as type', 'room.type as light_type', 'room.zone as light_zone')
        .then(function (result) {
            result.forEach(function (element) {
                element.room = {
                    type: element.light_type,
                    zone: element.light_zone
                };
                delete element.light_type;
                delete element.light_zone;
            });

            return result;
        });
}

module.exports = db;