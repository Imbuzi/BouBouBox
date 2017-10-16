exports.seed = function(knex, Promise) {
    return knex('user').del()
        .then(function () {
            knex('light').del()
        })
        .then(function () {
            knex('widget').del()
        })
        .then(function () {
            knex('bridge').del()
        })
        .then(function () {
            return knex('user').insert({
                mail: 'admin@boubou.io',
                name: 'Admin',
                surname: 'BouBou.io',
                password: 'SHA512$172154e2$1$83167962460978714d3a810a6cc2ac6d584ea82993b2dc5f603ff0cededfc85f869302ec071aff009986dd921b582a154fb4b8bec5c60026bdc365bf644e2004' //Admin123!
            });
        }).then(function () {
            return knex('bridge').insert({
                id: 1,
                name: 'Routeur de test',
                mac: 'FF:FF:FF:FF:FF:FF'
            });
        }).then(function () {
            return knex('widget').insert([
                {
                    id: 1,
                    name: 'Pièce 1',
                    type: 'light'
                },
                {
                    id: 2,
                    name: 'Pièce 2',
                    type: 'light'
                }
            ]);
        }).then(function () {
            return knex('light').insert([
                {
                    router: 1,
                    zone: 1,
                    type: 'rgbw',
                    power: false,
                    intensity: 100,
                    widget_id: 1
                },
                {
                    router: 1,
                    zone: 2,
                    type: 'rgbw',
                    power: false,
                    intensity: 100,
                    widget_id: 2
                }
            ]);
        })
};