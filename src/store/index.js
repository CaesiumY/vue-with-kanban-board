import Vue from "vue";
import Vuex from "vuex";
import { AUTH_TOKEN } from "../api";

import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

const userToken = localStorage.getItem(AUTH_TOKEN);
store.commit("LOGIN", userToken);

export default store;
