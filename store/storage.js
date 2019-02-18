// state
export const state = () => ({
    count_requests: null
})

// getters
export const getters = {
    count_requests: state => state.count_requests,
};
// mutations
export const mutations = {
    set(state, {type, value}) {
        state[type] = value;
    }
};

export const actions = {
    set({commit, dispatch}, {type, value}) {
        commit('set', {type: type, value: value});
        console.log('data/set');
        console.log(type);
        console.log(value);
    },
}

