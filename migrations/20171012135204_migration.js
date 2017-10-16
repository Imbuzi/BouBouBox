exports.up = function (knex, Promise) {
    return new Promise(function (resolve, reject) {
        Promise.all([
            knex.schema.createTableIfNotExists('user', table => {
                table.string('mail', 250).primary().notNullable()
                table.string('name').notNullable()
                table.string('surname', 100).notNullable()
                table.string('password', 250).notNullable()
                table.boolean('access').notNullable().defaultTo(false)
            }),
            knex.schema.createTableIfNotExists('widget', table => {
                table.increments('id').primary().notNullable()
                table.string('name', 100).notNullable()
                table.enum('type', ['light'])
            }),
            knex.schema.createTableIfNotExists('bridge', table => {
                table.increments('id').primary().notNullable()
                table.string('mac', 17).notNullable()
                table.string('name', 100).defaultTo(null)
            })
        ]).then(function () {
            knex.schema.createTableIfNotExists('light', table => {
                table.integer('router').notNullable().defaultTo(0)
                table.foreign('router').references('bridge.id')
                table.integer('zone').notNullable().defaulTo(0)
                table.primary(['router', 'zone'])
                table.enum('type', ['rgbw']).notNullable()
                table.boolean('power').notNullable().defaultTo(false)
                table.integer('intensity').notNullable().defaulTo(100)
                table.integer('widget_id').notNullable()
                table.foreign('widget_id').references('widget.id')
            })
        }).then(function () {
            resolve();
        }).catch(function () {
            reject();
        })
    });
};

exports.down = function (knex, Promise) {
    return Promise.all([
            knex.schema.dropTable('user'),
            knex.schema.dropTable('widget'),
            knex.schema.dropTable('bridge'),
            knex.schema.dropTable('light')
    ]);
};
