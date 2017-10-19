import api from './api';

export default function (token) {
    api.validateToken(token).then(function () {
        api.getWidgetList().then(function (widgetList) {
            socket.emit('widgetList', widgetList);
        }).catch(function (error) {
            socket.emit('widgetList', error);
        });
    }).catch(function (result) {
        socket.emit('widgetList', result);
    });
};