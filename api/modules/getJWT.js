const passwordHash = require('password-hash');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const api = {
    db: {
        user: {
            getByMail: require(require('path').dirname(require.main.filename) + '/api/modules/db/user/getByMail')
        }
    }
}

module.exports = function (mail, password) {
    return new Promise(function (resolve, reject) {
        if (!mail || !password) {
            reject({
                error: 400,
                message: "Erreur de requête"
            });
        } else {
            api.db.user.getByMail(mail).then(function (user) {
                if (!user) {
                    reject({
                        error: 401,
                        message: "Utilisateur inexistant"
                    });
                } else {
                    if (!(user.access)) {
                        reject({
                            error: 401,
                            message: "Utilisateur en attente de validation"
                        });
                    } else {
                        if (passwordHash.verify(password, user.password)) {
                            let payload = { mail: user.mail };
                            let cert = fs.readFileSync('./private.key');
                            jwt.sign(payload, cert, { algorithm: 'RS256' }, function (err, token) {
                                if (err) {
                                    reject({
                                        error: 500,
                                        message: "Erreur de chiffrement du token"
                                    });
                                } else {
                                    resolve({
                                        token: token,
                                        mail: mail
                                    });
                                }
                            });
                        } else {
                            reject({
                                error: 401,
                                message: "Mot de passe erroné"
                            });
                        }
                    }
                }
            });
        }
    });
}