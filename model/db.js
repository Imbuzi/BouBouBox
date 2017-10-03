const environment = process.env.NODE_ENV || 'development';
const config = require('../db-config.js')[environment];
const knex = require('knex')(config);

console.log(config);

const db = {
    widget: {}
};

db.widget.getAll = function () {
    return knex
        .from('widget')
        .leftOuterJoin('light', 'widget.id', 'light.widget_id')
        .innerJoin('bridge', 'bridge.id', 'light.router')
        .select('widget.id as id', 'widget.name as name', 'widget.type as type', 'light.type as light_type', 'light.zone as light_zone', 'bridge.mac as router_mac')
        .then(function (result) {
            result.forEach(function (element) {
                element.light = {
                    type: element.light_type,
                    zone: element.light_zone,
                    bridge: {
                        mac: element.router_mac
                    }
                };
                delete element.light_type;
                delete element.light_zone;
                delete element.router_mac;
            });

            return result;
        });
}

module.exports = db;