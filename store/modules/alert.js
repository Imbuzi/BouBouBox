// Initial state
const state = {
    opened: false,
    message: '',
    timeout: null
}

// Mutations
const mutations = {
    toggleAlert(state, value) {
        state.opened = value;
    },
    setMessage(state, message) {
        state.message = message;
    },
    setTimeout(state, timeout) {
        state.timeout = timeout;
    }
}

export default {
    state,
    mutations
}