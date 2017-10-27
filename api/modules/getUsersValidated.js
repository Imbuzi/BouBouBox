const api = {
    db: {
        user: {
            getValidated: require(require('path').dirname(require.main.filename) + '/api/modules/db/user/getValidated')
        }
    }
}

module.exports = function () {
    return new Promise(function (resolve, reject) {
        api.db.user.getValidated().then(function (result) {
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