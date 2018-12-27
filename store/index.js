import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    authentication: null, // содержит обьект пользователя
    token: null,

    pay_without_prepaid: null

  },
  getters: {
    getUser(state) {
      return state.authentication;
    },
    getPayWithoutPrepaid(state) {
      return state.pay_without_prepaid;
    },
    getToken(state) {
      return state.token;
    }
  },

  mutations: {
    //Универсальная мутация
    set(state, {type, value}) {
      state[type] = value;
    },
    // Для установки токена
    setToken(state, token) {
      // var ax = axios.create({
      //   baseURL: process.env.API_URL,
      //   headers: {
      //     'Access-Control-Allow-Origin': '*',
      //     "X-Requested-With": "XMLHttpRequest",
      //     'Authorization': 'Bearer ' + token
      //   }
      // });
      // Vue.use(VueAxios, ax);
    }
  }
})

export default store
