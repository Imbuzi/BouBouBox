module.exports = function (io) {
    let module = {};

    module.listen = function () {
        io.on('connection', function (socket) {
            if (process.env.NODE_ENV != 'production') {
                console.log('[SOCKET.IO] User connected with ID ' + socket.id);
            }

            let requests = {};
            require("fs").readdirSync(require("path").join(__dirname, "request")).forEach(function (file) {
                let name = file.replace(/\.[^/.]+$/, "");
                requests[name] = require("./request/" + file)(socket, io);
            });

            Object.keys(requests).forEach(function (key) {
                socket.on(key, requests[key].listener);
            });
        });
    }

    return module;
};