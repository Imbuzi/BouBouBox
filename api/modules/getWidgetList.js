const api = {
    db: {
        widget: {
            getAll: require(require('path').dirname(require.main.filename) + '/api/modules/db/widget/getAll')
        }
    }
}

module.exports = function() {
    return new Promise(function (resolve, reject) {
        api.db.widget.getAll().then(function (widgetListDetailed) {
            resolve({
                widgetList: widgetListDetailed
            });
        }).catch(function (error) {
            reject({
                error: 500,
                message: "Erreur de base de données"
            });
        });
    });
}