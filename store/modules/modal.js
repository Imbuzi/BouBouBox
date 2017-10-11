// Initial state
const state = {
    opened: false,
    component: null
}

// Mutations
const mutations = {
    toggleModal(state, value) {
        state.opened = value;
    },
    setVueComponent(component) {
        state.component = component;
    }
}

export default {
    state,
    mutations
}