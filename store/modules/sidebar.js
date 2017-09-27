// Initial state
const state = {
    opened: false,
    title: 'BouBouBox'
}

// Mutations
const mutations = {
    toggleSidebar(state) {
        state.opened = !state.opened;
    }
}

export default {
    state,
    mutations
}