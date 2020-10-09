<template>
  <div class="add-list" @click.prevent="onShowAddList">
    <input
      class="form-control"
      v-if="isShow"
      type="text"
      placeholder="Enter list title..."
      ref="inputTitle"
      v-model="inputTitle"
      @blur="onBlurAddList"
      @keyup.enter="onSubmitAddList"
    />
    <a v-else href="">&plus; Add another list</a>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      isShow: false,
      inputTitle: ""
    };
  },
  computed: {
    ...mapState({
      board: "board"
    })
  },
  methods: {
    ...mapActions({
      ADD_LIST: "ADD_LIST"
    }),
    onShowAddList() {
      this.isShow = true;
      this.$nextTick(() => this.$refs.inputTitle.focus());
    },
    onBlurAddList() {
      this.isShow = false;
      this.inputTitle = "";
    },
    onSubmitAddList() {
      const title = this.inputTitle.trim();
      if (!title) return this.onBlurAddList();

      const boardId = this.board.id;
      const lastList = this.board.lists[this.board.lists.length - 1];
      const pos = lastList ? lastList.pos * 2 : 65535;

      this.ADD_LIST({ title, boardId, pos }).then(() => this.onBlurAddList());
    }
  }
};
</script>

<style>
.add-list {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 12px;
  transition: all 0.3s;
  cursor: pointer;
}

.add-list input {
  margin: 0;
}

.add-list a {
  color: #ddd;
}

.add-list:hover,
.add-list:focus {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
