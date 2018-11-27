import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

    state: {
        auth: null,
        token:null,
    },
    getters: {
        getUser(state) {
            return  state.auth;
        },
        getToken(state) {
            return  state.token;
        }
    },

    mutations: {
        set(state, {type, value}) {
            state[type] = value;
        },
    }
})

export default store