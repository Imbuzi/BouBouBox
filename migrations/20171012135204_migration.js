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
            return knex.schema.createTableIfNotExists('light', table => {
                table.integer('router').notNullable().defaultTo(0).unsigned().references('id').inTable('bridge')
                table.primary(['router', 'zone'])
                table.integer('zone').notNullable().defaultTo(0)
                table.enum('type', ['rgbw']).notNullable()
                table.boolean('power').notNullable().defaultTo(false)
                table.integer('intensity').notNullable().defaultTo(100)
                table.integer('widget_id').notNullable().unsigned().references('id').inTable('widget')
            })
        })
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('user'),
        knex.schema.dropTable('bridge'),
        knex.schema.dropTable('widget'),
        knex.schema.dropTable('light')
    ]);
};
