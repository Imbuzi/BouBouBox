const api = require('../../../api');

// TODO : Remove console.log
module.exports = function (socket, io) {
    let module = {};

    module.listener = function (token, data) {
        api.validateToken(token).then(function () {
            api.milight.setLightColor(data.value, data.light).then(function (result) {
                console.log(result);
            }).catch(function (error) {
                console.log(error);
            });
        }).catch(function (result) {
            console.log(result);
        });
    };

    return module;
};