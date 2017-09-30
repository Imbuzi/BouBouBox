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

db.room.getAll = () => knex.select('room.id','room.name','room.zone','room.type','bridge.mac','bridge.name').from('room').innerJoin('bridge', 'room.router', 'bridge.id');

db.bridge.getAll = () => knex.select().from('bridge');

module.exports = db;