import Vue from 'vue'
import Vuex from 'vuex'
//import * as actions from './actions'
//import * as getters from './getters'
import sidebar from './modules/sidebar'
import theme from './modules/theme'
import panels from './modules/panels'
import rooms from './modules/rooms'
import widget from './modules/widget'

Vue.use(Vuex);

const dev = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    //actions,
    //getters,
    modules: {
        sidebar,
        theme,
        panels,
        rooms,
        widget
    },
    strict: dev
})