const environment = process.env.NODE_ENV || 'development';
const config = require(require('path').dirname(require.main.filename) + '/knexfile.js')[environment];
const knex = require('knex')(config);

let user = {};

user.getNotValidated = function () {
    return knex
        .from('user')
        .select('user.name as name', 'user.surname as surname', 'user.mail as mail')
        .where('user.access', 0)
}

user.getValidated = function () {
    return knex
        .from('user')
        .select('user.name as name', 'user.surname as surname', 'user.mail as mail')
        .where('user.access', 1)
}

user.getByMail = function (mail) {
    return knex
        .from('user')
        .select('user.name as name', 'user.surname as surname', 'user.mail as mail', 'user.password as password', 'user.access as access')
        .where('user.mail', mail)
        .first()
}

user.delete = function (mail) {
    return knex
        .from('user')
        .where('user.mail', mail)
        .del()
}

user.acceptUser = function (mail) {
    return knex
        .from('user')
        .where('user.mail', mail)
        .update({
            'access': 1
        })
}

user.add = function (name, surname, mail, hashedPassword) {
    return knex
        .insert({ name: name, surname: surname, mail: mail, password: hashedPassword })
        .into('user')
}

module.exports = user;