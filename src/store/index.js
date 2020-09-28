import Vue from "vue";
import Vuex from "vuex";
import { board } from "../api";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isAddBoardShow: false
  },
  mutations: {
    SET_ADD_BOARD_SHOW(state, value) {
      state.isAddBoardShow = value;
    }
  },
  actions: {
    ADD_BOARD(_, { title }) {
      board.create(title);
    }
  }
});

export default store;
