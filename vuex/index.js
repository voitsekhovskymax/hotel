import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const state = () => ({
  authentication: null, // содержит обьект пользователя
  token: null,
});

export default {
  state,
  getters,
  mutations,
  actions
};
