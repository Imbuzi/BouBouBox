import Vue from 'vue';

// Initial state
const state = {
    list: []
}

const mutations = {
    widgetProperty(state, value) {
        Vue._.set(value.widget, value.property, value.value);
    },
    setWidgetList(state, list) {
        state.list = list;
    }
}

export default {
    state,
    mutations
}