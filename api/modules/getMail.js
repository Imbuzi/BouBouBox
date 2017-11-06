const fs = require('fs');
const jwt = require('jsonwebtoken');

module.exports = function (token) {
    return new Promise(function (resolve, reject) {
        if (!token) {
            reject({
                error: 400,
                message: "Erreur de requête"
            });
        } else {
            let publicKey = fs.readFileSync(require('path').dirname(require.main.filename) + '/public/key/public.pem');
            jwt.verify(token, publicKey, { algorithm: 'RS256' }, function (err, payload) {
                if (err) {
                    reject({
                        error: 500,
                        message: "Erreur de déchiffrement du token",
                        data: err
                    });
                } else {
                    resolve({
                        payload: payload
                    });
                }
            });
        }
    });
}