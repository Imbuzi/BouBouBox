export const showAlert = function(context, payload) {
    context.commit('setMessage', payload.message);
    context.commit('toggleAlert', true);
    clearTimeout(context.state.alert.timeout);
    let timeout = setTimeout(function () {
        context.commit('toggleAlert', false);
    }, payload.delay);
    context.commit('setTimeout', timeout);
}