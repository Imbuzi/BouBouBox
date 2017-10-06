import milight from './milight/';

// Initial state
const state = {
    list: []
}

const mutations = {
    setWidgetProperty(state, value) {
        this._.set(value.widget, value.property, value.value);
    },
    setWidgetList(state, list) {
        state.list = list;
    }
}

export default {
    mutations/*,
    modules: {
        milight
    }*/
}