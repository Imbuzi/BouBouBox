const environment = process.env.NODE_ENV || 'development';
const config = require('../db-config.js')[environment];
const knex = require('knex')(config);

console.log(config);

const db = {};

db.panel = function() {
    return knex('panel');
}

db.panel.getAll = () => db.panel().select();

db.room = function () {
    return knex('room');
}

db.room.getAll = () => db.room().select();

module.exports = db;