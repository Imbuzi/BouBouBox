let getWidgetById = function (context, id) {
    return context.rootState.widget.list.filter(function (element) {
        return element.widget_type == 'milight' && element.milight.id == id;
    })[0];
}

const namespaced = true

const state = {}

const actions = {
    intensity(context, payload) {
        if (widget) {
            console.log({
                widget: getWidgetById(context, payload.id),
                property: 'milight.intensity',
                value: payload.intensity
            });
            context.commit('widgetProperty', {
                widget: getWidgetById(context, payload.id),
                property: 'milight.intensity',
                value: payload.intensity
            }, { root: true });
        }
    },
    power(context, payload) {
        if (widget) {
            console.log({
                widget: getWidgetById(context, payload.id),
                property: 'milight.intensity',
                value: payload.intensity
            });
            context.commit('widgetProperty', {
                widget: getWidgetById(context, payload.id),
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