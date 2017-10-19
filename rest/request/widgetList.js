const api = require('../../api');

module.exports = function (req, res) {
    let module = {};

    module.method = "GET";

    module.listener = function(req, res) {
        api.authenticateXMLHttpRequest(req).then(function () {
            api.getWidgetList().then(function (widgetList) {
                res.json(widgetList);
            }).catch(function (error) {
                res.status(error.error).json(error);
            });
        }).catch(function (error) {
            res.status(error.error).json(error);
        });
    };

    return module;
};