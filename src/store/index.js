import Vue from "vue";
import Vuex from "vuex";
import { board } from "../api";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isAddBoardShow: false,
    boards: []
  },
  mutations: {
    SET_ADD_BOARD_SHOW(state, payload) {
      state.isAddBoardShow = payload;
    },
    SET_BOARDS(state, payload) {
      state.boards = payload;
    }
  },
  actions: {
    ADD_BOARD(_, { title }) {
      board.create(title);
    },
    FETCH_BOARDS({ commit }) {
      board.fetch().then(res => commit("SET_BOARDS", res.list));
    }
  }
});

export default store;
