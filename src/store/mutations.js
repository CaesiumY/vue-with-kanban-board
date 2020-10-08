import { AUTH_TOKEN, setAuthInHeader } from "../api";

const mutations = {
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
  },
  SET_THEME(state, color) {
    state.bodyColor = color || "#fff";
    state.navColor = color != "#fff" ? "rgba(0, 0, 0, 0.15)" : "#026aa7";
  },
  SET_ADD_BOARD_SHOW(state, payload) {
    state.isAddBoardShow = payload;
  },
  SET_BOARDS(state, payload) {
    state.boards = payload;
  },
  SET_BOARD(state, payload) {
    state.board = payload;
  },
  SET_CARD(state, payload) {
    state.card = payload;
  },
  SET_IS_SHOW_BOARD_SETTINGS(state, toggle) {
    state.isShowBoardSettings = toggle;
  }
};

export default mutations;
