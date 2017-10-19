const api = require(require('path').dirname(require.main.filename) + '/api');

console.log(require('path').dirname(require.main.filename) + 'api');

let request = {};

request.method = "GET";

request.listener = function(req, res) {
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

module.exports = request;