const fs = require("fs");
const path = require("path");

module.exports = function (app) {
    if (process.env.NODE_ENV != 'production') {
        console.log('[EXPRESS] Initialising REST API');
    }

    let requests = {};
    const dirs = [];
    const files = [];
    fs.readdirSync(path.join(__dirname, "request")).map(function (f) {
        let stat = fs.statSync(path.join(path.join(__dirname, "request"), f));
        if (stat.isDirectory()) {
            dirs.push(f);
        } else if (stat.isFile()) {
            files.push(f);
        }
    });

    dirs.forEach(function (dir) {
        requests[dir] = {};
        fs.readdirSync(path.join(__dirname, 'request/' + dir)).forEach(function (subFile) {
            let name = subFile.replace(/\.[^/.]+$/, "");
            requests[dir][name] = require("./request/" + dir + '/' + subFile);
        });
    });

    requests[''] = {};
    files.forEach(function (file) {
        let name = file.replace(/\.[^/.]+$/, "");
        requests[''][name] = require("./request/" + file);
    });

    Object.keys(requests).forEach(function (module) {
        Object.keys(requests[module]).forEach(function (key) {
            if (module) {
                app[requests[module][key].method.toLowerCase()](module + '/' + key, requests[module][key].listener);
            } else {
                app[requests[module][key].method.toLowerCase()](key, requests[module][key].listener);
            }
        });
    });
};