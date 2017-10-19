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

            console.log(dirs);
            console.log(files);

            fs.readdirSync(path.join(__dirname, "request")).forEach(function (item) {
                console.log(item);
                console.log(fs.lstatSync(path.join(__dirname, item)))


                let name = item.replace(/\.[^/.]+$/, "");
                requests[name] = require("./request/" + item)(socket, io);
            });

            Object.keys(requests).forEach(function (key) {
                socket.on(key, requests[key].listener);
            });
        });
    }

    return module;
};