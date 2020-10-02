import { auth, board } from "../api";

const actions = {
  ADD_BOARD(_, { title }) {
    return board.create(title).then(res => res.item);
  },
  FETCH_BOARDS({ commit }) {
    return board.fetch().then(res => commit("SET_BOARDS", res.list));
  },
  FETCH_BOARD({ commit }, { id }) {
    return board.fetch(id).then(res => commit("SET_BOARD", res.item));
  },
  SET_LOGIN({ commit }, { email, password }) {
    return auth
      .login(email, password)
      .then(res => commit("LOGIN", res.accessToken));
  }
};

export default actions;
