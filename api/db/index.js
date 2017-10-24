const path = require('path');
const fs = require('fs');

let db = {};
fs.readdirSync(__dirname).map(function (f) {
    let stat = fs.statSync(path.join(__dirname, f));
    if (stat.isFile()) {
        db[f] = require(path.join(__dirname, f));
    }
});

console.log(db);

module.exports = db;