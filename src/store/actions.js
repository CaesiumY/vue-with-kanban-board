import { auth, board } from "../api";

const actions = {
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
};

export default actions;
