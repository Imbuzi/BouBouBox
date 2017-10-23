const fs = require('fs');
const path = require('path');

let plugins = {};
const files = [];
fs.readdirSync(path.join(__dirname, "plugins")).map(function (f) {
    let stat = fs.statSync(path.join(path.join(__dirname, "plugins"), f));
    if (stat.isFile()) {
        files.push(f);
    }
});

files.forEach(function (file) {
    let name = file.replace(/\.[^/.]+$/, "");
    plugins[name] = require("./plugins/" + file);
});

exports.up = function (knex, Promise) {
    return knex.schema.createTableIfNotExists('user', table => {
            table.string('mail', 150).primary().notNullable()
            table.string('name').notNullable()
            table.string('surname', 100).notNullable()
            table.string('password', 250).notNullable()
            table.boolean('access').notNullable().defaultTo(false)
        })
        .then(function () {
            return knex.schema.createTableIfNotExists('widget', table => {
                table.increments('id').primary().notNullable()
                table.string('name', 100).notNullable()
                table.integer('widget_type_id').unsigned().notNullable()
                table.enum('widget_type', Object.keys(plugins)).notNullable()
            })
        })
        .then(function () {
            let pluginsTablesPromises = [];
            Object.keys(plugins).forEach(function (key) {
                pluginsTablesPromises.push(knex.schema.createTableIfNotExists('widget_' + key, plugins[key]));
            });

            return Promise.all(pluginsTablesPromises);
        })
};

exports.down = function (knex, Promise) {
    let drops = [
        knex.schema.dropTableIfExists('user'),
        knex.schema.dropTableIfExists('bridge'),
        knex.schema.dropTableIfExists('widget'),
        knex.schema.dropTableIfExists('light')
    ];

    Object.keys(plugins).forEach(function (element) {
        drops.push(knex.schema.dropTableIfExists('widget_' + element));
    });

    return Promise.all(drops);
};
