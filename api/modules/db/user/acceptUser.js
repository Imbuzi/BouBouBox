const environment = process.env.NODE_ENV || 'development';
const config = require(require('path').dirname(require.main.filename) + '/knexfile.js')[environment];
const knex = require('knex')(config);

module.exports = function (mail) {
    return knex
        .from('user')
        .where('user.mail', mail)
        .update({
            'access': 1
        })
}