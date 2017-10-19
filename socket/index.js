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
                console.log(key);
                console.log(requests[key]);
                socket.on(key, requests[key].listener);
            });

            console.log(socket.eventNames());
        });
    }

    return module;
};