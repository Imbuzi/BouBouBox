const namespaced = true

const state = {}

const actions = {
    setLightIntensity(context, payload) {
        let widget = context.rootState.widget.list.filter(function (element) {
            return element.type == 'light' && element.light.bridge.mac == payload.value.light.bridge.mac && element.light.zone == payload.value.light.zone;
        })[0];

        if (widget) {
            context.commit('setWidgetProperty', {
                widget: widget,
                property: 'light.intensity',
                value: payload.value.value
            });
        }
    },
    power(context, payload) {
        let widget = context.rootState.widget.list.filter(function (element) {
            return element.widget_type == 'milight' && element.milight.id == payload.id;
        })[0];

        if (widget) {
            context.commit('setWidgetProperty', {
                widget: widget,
                property: 'milight.power',
                value: payload.value
            });
        }
    }
}

export default {
    namespaced,
    state,
    actions
}