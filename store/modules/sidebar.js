// Initial state
const state = {
    sidebar: {
        opened: false,
        title: 'BouBouBox'
    }
}

// Getters
const getters = {}

// Actions
const actions = {}

// Mutations
const mutations = {
    sidebar: {
        toggle(state) {
            state.sidebar.opened = !state.sidebar.opened;
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}