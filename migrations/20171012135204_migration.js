exports.up = function (knex, Promise) {
    return knex.raw('SET foreign_key_checks = 0;')
        .then(function () {
            return knex.schema.createTableIfNotExists('user', table => {
                table.string('mail', 250).primary().notNullable()
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
                table.enum('type', ['light'])
            })
        })
        .then(function () {
            return knex.schema.createTableIfNotExists('bridge', table => {
                table.increments('id').primary().notNullable()
                table.string('mac', 17).notNullable()
                table.string('name', 100).defaultTo(null)
            })
        })
        .then(function () {
            return knex.schema.createTableIfNotExists('widget', table => {
                table.increments('id').primary().notNullable()
                table.string('name', 100).notNullable()
                table.enum('type', ['light'])
            })
        })
        .then(function () {
            return knex.schema.createTableIfNotExists('light', table => {
                table.integer('router').notNullable().defaultTo(0)
                table.foreign('router').references('bridge.id')
                table.integer('zone').notNullable().defaultTo(0)
                table.primary(['router', 'zone'])
                table.enum('type', ['rgbw']).notNullable()
                table.boolean('power').notNullable().defaultTo(false)
                table.integer('intensity').notNullable().defaulTo(100)
                table.integer('widget_id').notNullable()
                table.foreign('widget_id').references('widget.id')
            })
        })
        .finally(function () {
            return knex.raw('SET foreign_key_checks = 1;');
        });
};

exports.down = function (knex, Promise) {
    return knex.raw('SET foreign_key_checks = 0;')
        .then(function () {
            return ['user', 'widget', 'bridge', 'light'];
        })
        .map(knex.schema.dropTable)
        .finally(function () {
            return knex.raw('SET foreign_key_checks = 1;');

        });
};
