const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = function (token) {
    return new Promise(function (resolve, reject) {
        let cert = fs.readFileSync('./public/key/public.pem');
        jwt.verify(token, cert, { algorithms: ['RS256'] }, function (err, decoded) {
            if (err) {
                reject({
                    error: 401,
                    message: "Erreur d'authentification (token invalide)"
                });
            } else {
                resolve();
            }
        });
    });
}