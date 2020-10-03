<template>
  <Modal class="modal-card" @close="onClose">
    <div class="modal-card-header" slot="header">
      <div class="modal-card-header-title">
        <input type="text" class="form-control" :value="card.title" readonly />
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
        readonly
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
      FETCH_CARD: "FETCH_CARD"
    }),
    onClose() {
      console.log("close");
      this.$router.push(`/board/${this.board.id}`);
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
