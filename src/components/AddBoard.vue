<template>
  <Modal @close="close">
    <div slot="header">
      <h2>
        Create new board
        <a href="" class="modal-default-button" @click.prevent="close">
          &times;
        </a>
      </h2>
    </div>

    <div slot="body">
      <form id="add-board-form" @submit.prevent="addBoard">
        <input type="text" class="form-control" v-model="input" ref="input" />
      </form>
    </div>

    <div slot="footer">
      <button
        class="btn"
        :class="{ 'btn-success': isValid }"
        type="submit"
        form="add-board-form"
        :disabled="!isValid"
      >
        Create Board
      </button>
    </div>
  </Modal>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import Modal from "./Modal";
export default {
  components: {
    Modal
  },
  data() {
    return {
      input: "",
      isValid: false
    };
  },
  watch: {
    input(value) {
      this.isValid = value.trim().length > 0;
    }
  },
  mounted() {
    this.$refs.input.focus();
  },
  methods: {
    ...mapMutations(["SET_ADD_BOARD_SHOW"]),
    ...mapActions(["ADD_BOARD", "FETCH_BOARDS"]),
    close() {
      this.SET_ADD_BOARD_SHOW(false);
    },
    addBoard() {
      this.close();
      this.ADD_BOARD({ title: this.input }).then(() => this.FETCH_BOARDS());
    }
  }
};
</script>

<style>
.modal-default-button {
  color: red;
}
</style>
