exports.seed = function(knex, Promise) {
    return knex('user').del()
        .then(function () {
            knex('widget').del()
        })
        .then(function () {
            knex('widget_milight').del()
        })
        .then(function () {
            return knex('user').insert({
                mail: 'admin@boubou.io',
                name: 'Admin',
                surname: 'BouBou.io',
                access: 1,
                password: 'SHA512$172154e2$1$83167962460978714d3a810a6cc2ac6d584ea82993b2dc5f603ff0cededfc85f869302ec071aff009986dd921b582a154fb4b8bec5c60026bdc365bf644e2004' //Admin123!
            });
        }).then(function () {
            return knex('widget').insert([
                {
                    id: 1,
                    name: 'Pièce 1',
                    widget_type: 'milight',
                    widget_type_id: 1,
                },
                {
                    id: 2,
                    name: 'Pièce 2',
                    widget_type: 'milight',
                    widget_type_id: 2
                }
            ]);
        }).then(function () {
            return knex('widget_milight').insert([
                {
                    id: 1,
                    bridge: "FF:FF:FF:FF:FF:FF",
                    zone: 1,
                    type: 'rgbw',
                    power: false,
                    intensity: 100
                },
                {
                    id: 2,
                    bridge: "FF:FF:FF:FF:FF:FF",
                    zone: 2,
                    type: 'rgbw',
                    power: false,
                    intensity: 100
                }
            ]);
        })
};