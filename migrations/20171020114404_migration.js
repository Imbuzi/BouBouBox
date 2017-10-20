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
    return knex.raw('SET foreign_key_checks = 0;')
        .then(function () {
            return knex.schema.createTableIfNotExists('user', table => {
                table.string('mail', 150).primary().notNullable()
                table.string('name').notNullable()
                table.string('surname', 100).notNullable()
                table.string('password', 250).notNullable()
                table.boolean('access').notNullable().defaultTo(false)
            })
        })
        .then(function () {
            return knex.schema.createTableIfNotExists('widget', table => {
                table.increments('id').primary().notNullable()
                table.string('name', 100).notNullable()
                table.integer('widget_type_id').unsigned().notNullable()
                table.enum('widget_type', ['light']).notNullable()
            })
        })
        .then(function () {
            console.log(plugins);
        })
        .finally(function () {
            return knex.raw('SET foreign_key_checks = 1;');
        });
};

exports.down = function (knex, Promise) {
    return knex.raw('SET foreign_key_checks = 0;')
        .then(function () {
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
        })
        .finally(function () {
            return knex.raw('SET foreign_key_checks = 1;');
        });
};
