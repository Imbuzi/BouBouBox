// Initial state
const state = {
    opened: false
}

// Mutations
const mutations = {
    toggleModal(state, value) {
        state.opened = value;
    }
}

export default {
    state,
    mutations
}