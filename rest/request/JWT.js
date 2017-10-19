const api = require('../../api');

module.exports = function (req, res) {
    let module = {};

    module.method = "POST";

    module.listener = function (req, res) {
        api.getJWT(req.body.mail, req.body.password).then(function (result) {
            res.json(result);
        }).catch(function (result) {
            res.status(result.error).json(result);
        });
    };

    return module;
};