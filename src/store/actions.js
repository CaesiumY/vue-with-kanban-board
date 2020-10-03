import { auth, board, card } from "../api";

const actions = {
  SET_LOGIN({ commit }, { email, password }) {
    return auth
      .login(email, password)
      .then(res => commit("LOGIN", res.accessToken));
  },
  ADD_BOARD(_, { title }) {
    return board.create(title).then(res => res.item);
  },
  FETCH_BOARDS({ commit }) {
    return board.fetch().then(res => commit("SET_BOARDS", res.list));
  },
  FETCH_BOARD({ commit }, { id }) {
    return board.fetch(id).then(res => commit("SET_BOARD", res.item));
  },
  ADD_CARD({ dispatch, state }, { title, listId, pos }) {
    return card.create(title, listId, pos).then(res => {
      dispatch("FETCH_BOARD", { id: state.board.id });
    });
  }
};

export default actions;
