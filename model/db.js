const environment = process.env.NODE_ENV || 'development';
const config = require('../db-config.js')[environment];
const knex = require('knex')(config);

console.log(config);

const db = {};

db.panel = function() {
    return knex('panel');
}

db.panel.getAll = () => db.panel().select();

module.exports = db;