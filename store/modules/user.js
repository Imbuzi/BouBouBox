// Initial state
const state = {
    token: null,
    key: null
}

// Mutations
const mutations = {
    setTokenAndKey(state, payload) {
        state.token = payload.token;
        state.key = payload.key;
    }
}

export default {
    state
}