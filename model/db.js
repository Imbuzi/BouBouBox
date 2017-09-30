const environment = process.env.NODE_ENV || 'development';
const config = require('../db-config.js')[environment];
const knex = require('knex')(config);

console.log(config);

const db = {
    panel: {},
    room: {},
    bridge: {},
};

db.panel.getAll = () => knex('panel').select();

db.room.getAll = () => knex('room').innerJoin('bridge', 'room.router', 'bridge.id').select();

db.bridge.getAll = () => knex('bridge').select();

module.exports = db;