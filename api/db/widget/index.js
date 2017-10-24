const environment = process.env.NODE_ENV || 'development';
const config = require(require('path').dirname(require.main.filename) + '/knexfile.js')[environment];
const knex = require('knex')(config);

let widget = {};

widget.getList = function () {
    return knex.from('widget').select()
}

widget.getWidgetListDetails = function (widgetList) {
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

widget.getAll = function () {
    return new Promise(function (resolve, reject) {
        widget.getList().then(function (widgetList) {
            return widget.getWidgetListDetails(widgetList).then(function (widgetListDetailed) {
                resolve(widgetListDetailed);
            }).catch(function (error) {
                reject(error);
            });
        }).catch(function (error) {
            reject(error);
        });
    });
}

module.exports = widget;