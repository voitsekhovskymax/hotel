import Cookies from 'js-cookie'

// state
export const state = () => ({
    god_mode: null, // Активирует панельку деповса
    options: {
        sidebar: false,
        night_theme: false,
        new_options: false,
    }
})

// getters
export const getters = {
    god_mode: state => state.god_mode,

}

// mutations
export const mutations = {
    //Универсальная мутация
    set(state, {type, value}) {
        state[type] = value;
    },

    UPDATE_OPTIONS(state, {type, value}) {
        state.options[type] = value
    },
    //Пример обычной мутации
    // FETCH_USER_SUCCESS (state, user) {
    //     state.user = user
    // },

}

// actions
export const actions = {
    godMode({commit, dispatch}, {godMode,}) {
        commit('set', {type: 'god_mode', value: godMode});
        commit('UPDATE_OPTIONS', {type: 'sidebar', value: godMode});

        Cookies.set('god_mode', godMode,)

    },

    godModeOptions({commit, dispatch}, {type, value}) {
        commit('UPDATE_OPTIONS', {type: type, value: value});
        Cookies.set(type, value)
    },
    //
    // async fetchUser ({ commit }) {
    //     try {
    //         const { data } = await axios.get('/user')
    //
    //         commit('FETCH_USER_SUCCESS', data)
    //     } catch (e) {
    //         Cookies.remove('token')
    //
    //         commit('FETCH_USER_FAILURE')
    //     }
    // },
    //
    // updateUser ({ commit }, payload) {
    //     commit('UPDATE_USER', payload)
    // },
    //
    // async logout ({ commit }) {
    //     try {
    //         await axios.post('/logout')
    //     } catch (e) { }
    //
    //     Cookies.remove('token')
    //
    //     commit('LOGOUT')
    // },


}
