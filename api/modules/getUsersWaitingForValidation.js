const api = {
    db: {
        user: {
            getNotValidated: require(require('path').dirname(require.main.filename) + '/api/modules/db/user/getNotValidated')
        }
    }
}

module.exports = function () {
    return new Promise(function (resolve, reject) {
        api.db.user.getNotValidated().then(function (result) {
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