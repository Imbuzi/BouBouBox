import milight from './milight/';

// Initial state
const state = {
    list: []
}

const mutations = {
    setWidgetProperty(state, value) {
        _.set(value.widget, value.property, value.value);
    },
    setWidgetList(state, list) {
        state.list = list;
    }
}

export default {
    state,
    mutations,
    modules: {
        milight
    }
}