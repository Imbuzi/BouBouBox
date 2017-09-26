const environment = process.env.NODE_ENV || 'development';
const config = require('../db-config.js')[environment];
const knex = require('knex')(config);

console.log(config);

function panel() {
    return knex('panel');
}

db.panel.getAll = () => panel().select();

module.exports = db;