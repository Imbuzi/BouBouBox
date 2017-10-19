const api = require('../../api');

let request = {};

request.method = "POST";

request.listener = function (req, res) {
    api.getJWT(req.body.mail, req.body.password).then(function (result) {
        res.json(result);
    }).catch(function (result) {
        res.status(result.error).json(result);
    });
};

module.exports = request;