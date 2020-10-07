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
  DELETE_BOARD(_, { id }) {
    return board.delete(id);
  },
  ADD_CARD({ dispatch, state }, { title, listId, pos }) {
    return card.create(title, listId, pos).then(res => {
      dispatch("FETCH_BOARD", { id: state.board.id });
    });
  },
  FETCH_CARD({ commit }, { id }) {
    return card.fetch(id).then(data => {
      commit("SET_CARD", data.item);
    });
  },
  UPDATE_CARD({ dispatch, state }, { id, title, description, listId, pos }) {
    return card
      .update(id, { title, description, listId, pos })
      .then(() => dispatch("FETCH_BOARD", { id: state.board.id }));
  },
  DELETE_CARD({ dispatch, state }, { id }) {
    return card
      .delete(id)
      .then(() => dispatch("FETCH_BOARD", { id: state.board.id }));
  }
};

export default actions;
