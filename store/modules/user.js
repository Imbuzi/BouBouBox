// Initial state
const state = {
    token: null,
    mail: null,
    waitingForValidation: [],
    validated: []
}

// Mutations
const mutations = {
    setToken(state, payload) {
        state.token = payload.token;
    },
    setMail(state, mail) {
        state.mail = mail;
    },
    addUserWaitingForValidation(state, user) {
        state.waitingForValidation.push(user);
    },
    removeUserWaitingForValidation(state, userToRemove) {
        state.waitingForValidation = state.waitingForValidation.filter(function (user) {
            return user.mail != userToRemove.mail;
        });
    },
    removeUserValidated(state, mail) {
        state.validated = state.validated.filter(function (user) {
            return user.mail != mail;
        });
    },
    addUserValidated(state, user) {
        state.validated.push(user);
    },
    setUsersWaitingForValidation(state, users) {
        state.waitingForValidation = users;
    },
    setUsersValidated(state, users) {
        state.validated = users;
    }
}

export default {
    state,
    mutations
}