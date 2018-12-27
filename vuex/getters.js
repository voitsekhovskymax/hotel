export default {
  isAuthenticated(state) {
    var token = this.$cookies.get('token');
    if (token != undefined) {
      console.log("токен найден в хранилище");
      return true;
    } else {
      console.log("токен не найден в хранилище");
      return false;
    }

  },
  getUser(state) {
    return state.authentication;
  },
  getToken(state) {
    return state.token;
  }
};
