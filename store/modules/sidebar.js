// Initial state
const state = {
    sidebar: {
        opened: false,
        title: 'BouBouBox'
    }
}

// Mutations
const mutations = {
    toggleSidebar(state) {
        state.sidebar.opened = !state.sidebar.opened;
    }
}

export default {
    state,
    mutations
}