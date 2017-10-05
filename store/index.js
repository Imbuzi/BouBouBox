import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import sidebar from './modules/sidebar';
import theme from './modules/theme';
import widget from './modules/widget';
import user from './modules/user';
import alert from './modules/alert';

Vue.use(Vuex);

const dev = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    actions,
    modules: {
        sidebar,
        theme,
        widget,
        user,
        alert
    },
    strict: dev
})