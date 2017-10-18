const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');
const fs = require('fs');
const db = require('../model/db.js');
const milightAPI = require('./milight/functions.js');

let api = {
    milight: milightAPI
};

api.authenticateXMLHttpRequest = function (req) {
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

api.getUsersWaitingForValidation = function () {
    return new Promise(function (resolve, reject) {
        db.user.getNotValidated().then(function (result) {
            resolve({
                userList: result
            });
        }).catch(function (error) {
            reject({
                error: 500,
                message: "Erreur de base de données"
            });
        });
    });
}

api.refuseNewUser = function (mail) {
    return new Promise(function (resolve, reject) {
        db.user.delete(mail).then(function () {
            resolve(mail);
        }).catch(function (error) {
            reject({
                error: 500,
                message: "Erreur de base de données"
            });
        });
    });
}

api.acceptNewUser = function (mail) {
    return new Promise(function (resolve, reject) {
        db.user.acceptUser(mail).then(function () {
            resolve(mail);
        }).catch(function (error) {
            reject({
                error: 500,
                message: "Erreur de base de données"
            });
        });
    });
}

api.addUser = function (name, surname, mail, hashedPassword) {
    return new Promise(function (resolve, reject) {
        db.user.add(name, surname, mail, hashedPassword).then(function () {
            resolve({
                name: name,
                surname: surname,
                mail: mail
            });
        }).catch(function (error) {
            if (error.errno == 1062) {
                reject({
                    error: 500,
                    message: "Adresse mail déjà liée à un compte"
                });
            } else {
                reject({
                    error: 500,
                    message: "Erreur de base de données"
                });
            }
        });
    });
}

api.validateToken = function (token) {
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

api.getWidgetList = function() {
    return new Promise(function (resolve, reject) {
        db.widget.getAll().then(function (widgetList) {
            db.widget.getWidgetListDetails(widgetList).then(function (widgetList) {
                resolve({
                    widgetList: widgetList
                });
            }).catch(function (error) {
                reject({
                    error: 500,
                    message: "Erreur de base de données"
                });
            });
        }).catch(function (error) {
            reject({
                error: 500,
                message: "Erreur de base de données"
            });
        });
    });
}

api.getJWT = function(mail, password) {
    return new Promise(function (resolve, reject) {
        if (!mail || !password) {
            reject({
                error: 400,
                message: "Erreur de requête"
            });
        } else {
            db.user.getByMail(mail).then(function (user) {
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
                            let token = jwt.sign(payload, cert, { algorithm: 'RS256' }, function (err, token) {
                                if (err) {
                                    reject({
                                        error: 500,
                                        message: "Erreur de chiffrement du token"
                                    });
                                } else {
                                    resolve({
                                        token: token
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

module.exports = api;