// Initial state
const state = {
    token: null
}

// Mutations
const mutations = {
    setToken(state, payload) {
        state.token = payload.token;
    }
}

export default {
    state,
    mutations
}