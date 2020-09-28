import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isAddBoardShow: false
  },
  mutations: {
    SET_ADD_BOARD_SHOW(state, value) {
      state.isAddBoardShow = value;
    }
  }
});

export default store;
