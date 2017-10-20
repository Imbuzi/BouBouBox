module.exports = function (table) {
    table.increments('id').primary().notNullable()
    table.integer('zone').notNullable().defaultTo(0)
    table.enum('type', ['rgbw']).notNullable()
    table.boolean('power').notNullable().defaultTo(true)
    table.integer('intensity').notNullable().defaultTo(100)
    table.string('bridge', 19).notNullable()
}