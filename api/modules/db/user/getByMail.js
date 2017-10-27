const environment = process.env.NODE_ENV || 'development';
const config = require(require('path').dirname(require.main.filename) + '/knexfile.js')[environment];
const knex = require('knex')(config);

module.exports = function (mail) {
    return knex
        .from('user')
        .select('user.name as name', 'user.surname as surname', 'user.mail as mail', 'user.password as password', 'user.access as access')
        .where('user.mail', mail)
        .first()
}