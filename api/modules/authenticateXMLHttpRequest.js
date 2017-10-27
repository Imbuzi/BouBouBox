const api = {
    validateToken: require(require('path').dirname(require.main.filename) + '/api/modules/validateToken')
}

module.exports = function (req) {
    return new Promise(function (resolve, reject) {
        let header = req.get('Authorization');
        if (header) {
            header = header.split(' ');
            if (header[0] === 'Bearer') {
                api.validateToken(header[1]).then(function () {
                    resolve();
                }).catch(function (tokenError) {
                    reject(tokenError);
                });
            } else {
                reject({
                    error: 400,
                    message: "Erreur de requête"
                });
            }
        } else {
            reject({
                error: 400,
                message: "Erreur de requête"
            });
        }
    });
}