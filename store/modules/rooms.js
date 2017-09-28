// Initial state
const state = {
    list: [/* {id, name, router, zone} */]
}

const mutations = {
    setRoomList(state, list) {
        state.list = list;
    }
}

export default {
    state,
    mutations
}