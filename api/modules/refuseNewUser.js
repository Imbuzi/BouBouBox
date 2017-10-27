const api = {
    db: {
        user: {
            delete: require(require('path').dirname(require.main.filename) + '/api/modules/db/user/delete')
        }
    }
}

module.exports = function (mail) {
    return new Promise(function (resolve, reject) {
        api.db.user.delete(mail).then(function () {
            resolve(mail);
        }).catch(function (error) {
            reject({
                error: 500,
                message: "Erreur de base de données"
            });
        });
    });
}