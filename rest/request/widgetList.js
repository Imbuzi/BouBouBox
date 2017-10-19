const api = require('../../api');

console.log(process.env.NODE_PATH);

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