// Actions
const actions = {
    showAlert(context, payload) {
        context.commit('setMessage', payload.message);
        context.commit('toggleAlert', true);
        clearTimeout(context.state.alert.timeout);
        let timeout = setTimeout(function () {
            commit('toggleAlert', false);
        }, payload.delay);
        context.commit('setTimeout', timeout);
    }
}

export default {
    actions
}