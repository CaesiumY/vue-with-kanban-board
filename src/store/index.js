import Vue from "vue";
import Vuex from "vuex";
import { auth, AUTH_TOKEN, board, setAuthInHeader } from "../api";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isAddBoardShow: false,
    boards: [],
    token: null
  },
  getters: {
    isAuth(state) {
      return !!state.token;
    }
  },
  mutations: {
    SET_ADD_BOARD_SHOW(state, payload) {
      state.isAddBoardShow = payload;
    },
    SET_BOARDS(state, payload) {
      state.boards = payload;
    },
    LOGIN(state, token) {
      if (!token) return;
      state.token = token;
      localStorage.setItem(AUTH_TOKEN, token);
      setAuthInHeader(token);

      console.log("login");
    },
    LOGOUT(state) {
      state.token = null;
      localStorage.removeItem(AUTH_TOKEN);
      setAuthInHeader(null);
    }
  },
  actions: {
    ADD_BOARD(_, { title }) {
      return board.create(title);
    },
    FETCH_BOARDS({ commit }) {
      return board.fetch().then(res => commit("SET_BOARDS", res.list));
    },
    SET_LOGIN({ commit }, { email, password }) {
      return auth
        .login(email, password)
        .then(res => commit("LOGIN", res.accessToken));
    }
  }
});

const userToken = localStorage.getItem(AUTH_TOKEN);
store.commit("LOGIN", userToken);

export default store;
