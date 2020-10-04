<template>
  <Modal class="modal-card" @close="onClose">
    <div class="modal-card-header" slot="header">
      <div class="modal-card-header-title">
        <input
          type="text"
          class="form-control"
          v-model="card.title"
          :readonly="!isInputTitle"
          @click="isInputTitle = true"
          @blur="onBlurTitle"
          ref="inputTitle"
        />
      </div>
      <a href="" class="modal-close-btn" @click.prevent="onClose">&times;</a>
    </div>
    <div slot="body">
      <h3>Description</h3>
      <textarea
        class="form-control"
        cols="30"
        rows="3"
        placeholder="Add a more detailed Description..."
        :readonly="!isInputDesc"
        @click="isInputDesc = true"
        @blur="onBlurDesc"
        ref="inputDesc"
        v-model="card.description"
      ></textarea>
    </div>
    <div slot="footer"></div>
  </Modal>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Modal from "./Modal";

export default {
  components: {
    Modal
  },
  name: "card",
  data() {
    return {
      isInputTitle: false,
      isInputDesc: false
    };
  },
  computed: {
    ...mapState({
      board: "board",
      card: "card"
    })
  },
  created() {
    this.FETCH_CARD({ id: this.$route.params.cid });
  },
  methods: {
    ...mapActions({
      FETCH_CARD: "FETCH_CARD",
      UPDATE_CARD: "UPDATE_CARD"
    }),
    onClose() {
      console.log("close");
      this.$router.push(`/board/${this.board.id}`);
    },
    onBlurTitle() {
      this.isInputTitle = false;

      const title = this.$refs.inputTitle.value.trim();
      if (!title) return;

      this.UPDATE_CARD({ id: this.card.id, title });
    },
    onBlurDesc() {
      this.isInputDesc = false;

      const description = this.$refs.inputDesc.value.trim();
      if (!description) return;

      this.UPDATE_CARD({ id: this.card.id, description });
    }
  }
};
</script>

<style>
.modal-card .modal-container {
  min-width: 300px;
  max-width: 800px;
  width: 60%;
}

.modal-card-header-title {
  padding-right: 30px;
}

.modal-card-header-title input {
  padding: 6px 0;
}

.modal-card-header-title input:read-only {
  background-color: #fff;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.modal-close-btn {
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 28px;
  text-decoration: none;
}

.modal-close-btn:hover,
.modal-close-btn:focus {
  color: red;
}

.modal-card-header {
  position: relative;
}
</style>
