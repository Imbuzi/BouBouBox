const namespaced = true

const state = {}

const actions = {
    intensity(context, payload) {
        let widget = context.rootState.widget.list.filter(function (element) {
            return element.widget_type == 'milight' && element.milight.id == payload.id;
        })[0];

        if (widget) {
            context.commit('widgetProperty', {
                widget: widget,
                property: 'milight.intensity',
                value: payload.intensity
            }, { root: true });
        }
    },
    power(context, payload) {
        let widget = context.rootState.widget.list.filter(function (element) {
            return element.widget_type == 'milight' && element.milight.id == payload.id;
        })[0];

        if (widget) {
            context.commit('widgetProperty', {
                widget: widget,
                property: 'milight.power',
                value: payload.power
            }, { root: true });
        }
    }
}

export default {
    namespaced,
    state,
    actions
}