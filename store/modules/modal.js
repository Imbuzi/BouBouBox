// Initial state
const state = {
    component: null
}

// Mutations
const mutations = {
    setModalComponent(state, component) {
        state.component = component;
    }
}

export default {
    state,
    mutations
}