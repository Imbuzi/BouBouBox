const api = {
    db: {
        user: {
            acceptUser: require(require('path').dirname(require.main.filename) + '/api/modules/db/user/acceptUser'),
            getByMail: require(require('path').dirname(require.main.filename) + '/api/modules/db/user/getByMail')
        }
    }
}

module.exports = function (mail) {
    return new Promise(function (resolve, reject) {
        api.db.user.acceptUser(mail).then(function () {
            api.db.user.getByMail(mail).then(function (user) {
                resolve(user);
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