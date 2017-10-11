// Initial state
const state = {
    token: null,
    waitingForValidation: []
}

// Mutations
const mutations = {
    setToken(state, payload) {
        state.token = payload.token;
    },
    addUserWaitingForValidation(state, user) {
        state.waitingForValidation.push(user);
    },
    setUsersWaitingForValidation(state, users) {
        state.waitingForValidation = user;
    }
}

export default {
    state,
    mutations
}