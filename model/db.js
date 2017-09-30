const environment = process.env.NODE_ENV || 'development';
const config = require('../db-config.js')[environment];
const knex = require('knex')(config);

console.log(config);

const db = {
    panel: {},
    room: {},
    bridge: {},
};

db.panel.getAll = () => knex.select().from('panel');

db.room.getAll = function () {
    knex
        .select('room.id as id', 'room.name as name', 'room.zone as zone', 'room.type as type', 'bridge.mac as router_mac', 'bridge.name as router_name')
        .from('room')
        .innerJoin('bridge', 'room.router', 'bridge.id')
        .then(function (result) {
            /*result.router = {
                name: result.router_name,
                mac: result.router_mac
            };
            delete result.router_name;
            delete result.router_mac;*/

            return result;
        });
}

db.bridge.getAll = () => knex.select().from('bridge');

module.exports = db;