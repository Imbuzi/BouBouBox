// Initial state
const state = {
    list: []
}

const mutations = {
    setWidgetList(state, list) {
        state.list = list;
    },
    setLightIntensity(state, value) {
        let widget = state.list.filter(function (element) {
            return element.type == 'light' && element.light.bridge.mac == value.light.bridge.mac && element.light.zone == value.light.zone;
        })[0];

        if (widget) {
            widget.light.intensity = value.value;
        }
    }
}

export default {
    state,
    mutations
}