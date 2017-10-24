const path = require('path');
const fs = require('fs');

const environment = process.env.NODE_ENV || 'development';
const config = require('../../knexfile.js')[environment];
const knex = require('knex')(config);

let db = {};
fs.readdirSync(__dirname).map(function (f) {
    let stat = fs.statSync(path.join(__dirname, f));
    if (stat.isDirectory()) {
        db[f] = require(path.join(__dirname, f));
    }
});

console.log(db);

db = {
    widget: {},
    user: {}
};



db.widget.getList = function () {
    return knex.from('widget').select()
}

db.widget.getWidgetListDetails = function (widgetList) {
    return new Promise(function (resolve, reject) {
        Promise.all(
            widgetList.map(function (widget) {
                return knex
                    .from('widget_' + widget.widget_type)
                    .select()
                    .where('id', widget.widget_type_id)
                    .first()
                    .then(function (res) {
                        widget[widget.widget_type] = res
                    })
            })
        ).then(function (promises) {
            resolve(widgetList);
        }).catch(function (error) {
            reject(error);
        })
    });
}

db.widget.getAll = function () {
    return new Promise(function (resolve, reject) {
        db.widget.getList().then(function (widgetList) {
            return db.widget.getWidgetListDetails(widgetList).then(function (widgetListDetailed) {
                resolve(widgetListDetailed);
            }).catch(function (error) {
                reject(error);
            });
        }).catch(function (error) {
            reject(error);
        });
    });
}

db.user.getByMail = function (mail) {
    return knex
        .from('user')
        .select('user.password as password', 'user.access as access')
        .where('user.mail', mail)
        .first()
}

db.user.getNotValidated = function () {
    return knex
        .from('user')
        .select('user.name as name', 'user.surname as surname', 'user.mail as mail')
        .where('user.access', 0)
}

db.user.delete = function (mail) {
    return knex
        .from('user')
        .where('user.mail', mail)
        .del()
}

db.user.acceptUser = function (mail) {
    return knex
        .from('user')
        .where('user.mail', mail)
        .update({
            'access': 1
        })
}

db.user.add = function (name, surname, mail, hashedPassword) {
    return knex
        .insert({ name: name, surname: surname, mail: mail, password: hashedPassword })
        .into('user')
}

module.exports = db;