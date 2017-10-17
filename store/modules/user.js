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
    removeUserWaitingForValidation(state, mail) {
        state.waitingForValidation = state.waitingForValidation.filter(function (user) {
            return user.mail != mail;
        });
    },
    setUsersWaitingForValidation(state, users) {
        state.waitingForValidation = users;
    }
}

export default {
    state,
    mutations
}