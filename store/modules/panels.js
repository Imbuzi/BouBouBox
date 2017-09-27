// Initial state
const state = {
    list: [
        {
            id: 1,
            name: 'TEST'
        }
    ]
}

const mutations = {
    setPanelList(state, list) {
        state.list = list;
    }
}

export default {
    state,
    mutations
}