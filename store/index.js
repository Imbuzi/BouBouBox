import Vue from 'vue';
import Vuex from 'vuex';
import sidebar from './modules/sidebar';
import theme from './modules/theme';
import widget from './modules/widget';
import user from './modules/user';
import alert from './modules/alert';
import modal from './modules/modal';
import * as plugins from './module/plugins';

Vue.use(Vuex);

const dev = process.env.NODE_ENV !== 'production'

console.log(plugins);

export default new Vuex.Store({
    modules: {
        sidebar,
        theme,
        widget,
        user,
        alert,
        modal
    },
    strict: dev
})