import Vue from 'vue';
import Vuex from 'vuex';
import sidebar from './modules/sidebar';
import theme from './modules/theme';
import widget from './modules/widget';
import user from './modules/user';
import alert from './modules/alert';
import modal from './modules/modal';
import * as plugins from './modules/plugins';

Vue.use(Vuex);

let formattedPlugins = plugins.map(function (item) {
    for (let key in item) {
        item[key.toLowerCase()] = item[key];
        delete item[key];
    }
    return item;
});

const dev = process.env.NODE_ENV != 'production'

let modules = Object.assign(
    {
        sidebar,
        theme,
        widget,
        user,
        alert,
        modal
    },
    formattedPlugins
);

console.log(modules);

export default new Vuex.Store({
    modules: modules,
    strict: dev
})