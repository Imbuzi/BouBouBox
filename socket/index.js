const fs = require("fs");
const path = require("path");

module.exports = function (io) {
    let module = {};

    module.listen = function () {
        io.on('connection', function (socket) {
            if (process.env.NODE_ENV != 'production') {
                console.log('[SOCKET.IO] User connected with ID ' + socket.id);
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
                    requests[dir][name] = require("./request/" + dir + '/' + subFile)(socket, io);
                });
            });

            requests[''] = {};
            files.forEach(function (file) {
                let name = file.replace(/\.[^/.]+$/, "");
                requests[''][name] = require("./request/" + file)(socket, io);
            });

            console.log(requests);

            Object.keys(requests).forEach(function (module) {
                Object.keys(requests[module]).forEach(function (key) {
                    console.log(module);
                    console.log(key);
                    console.log(requests[module][key]);
                    //socket.on(key, requests[key].listener);
                });
            });
        });
    }

    return module;
};