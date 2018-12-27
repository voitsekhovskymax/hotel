import types from "./mutation-types";

export default {
  // [types.SET_EXAMPLE_STATE]: (state, payload) => {
  //   state.exampleState = payload;
  // }
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
};
