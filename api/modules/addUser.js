const api = {
    db: {
        user: {
            add: require(require('path').dirname(require.main.filename) + '/api/modules/db/user/add')
        }
    }
}

module.exports = function (name, surname, mail, hashedPassword) {
    return new Promise(function (resolve, reject) {
        api.db.user.add(name, surname, mail, hashedPassword).then(function () {
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