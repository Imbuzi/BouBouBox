// Initial state
const state = {
    list: []
}

const mutations = {
    setWidgetList(state, list) {
        state.list = list;
    }
}

export default {
    state,
    mutations
}