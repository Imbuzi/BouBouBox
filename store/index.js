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

let formattedPlugins{};
Object.keys(plugins).forEach(function (key) {
    formattedPlugins[key.toLowerCase()] = plugins[key];
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