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

const actions = {
    showAlert(context, payload) {
        context.commit('setMessage', payload.message);
        context.commit('toggleAlert', true);
        clearTimeout(context.state.alert.timeout);
        let timeout = setTimeout(function () {
            context.commit('toggleAlert', false);
        }, payload.delay);
        context.commit('setTimeout', timeout);
    }
}

export default {
    actions,
    state,
    mutations
}