<template>
  <div>
    <div class="home-title">Personal Boards</div>
    <div class="board-list" ref="boardList">
      <div
        class="board-item"
        v-for="b in boards"
        :key="b.id"
        :data-bgcolor="b.bgColor"
        ref="boardItem"
      >
        <router-link :to="`/board/${b.id}`">
          <div class="board-item-title">{{ b.title }}</div>
        </router-link>
      </div>

      <div class="board-item board-item-new">
        <a class="new-board-btn" @click.prevent="showAddBoard">
          Create new board...
        </a>
      </div>
    </div>
    <AddBoard
      v-if="isAddBoardShow"
      @close="isAddBoardShow = false"
      @submit="onAddBoard"
    />
  </div>
</template>

<script>
import { board } from "../api";
import AddBoard from "./AddBoard";
import { mapMutations, mapState } from "vuex";

export default {
  components: {
    AddBoard
  },
  data() {
    return {
      isLoading: true,
      boards: [],
      error: ""
    };
  },
  computed: {
    ...mapState(["isAddBoardShow"])
  },
  created() {
    this.fetchData();
  },
  updated() {
    this.$refs.boardItem.forEach(item => {
      item.style.backgroundColor = item.dataset.bgcolor;
    });
  },
  methods: {
    ...mapMutations(["SET_ADD_BOARD_SHOW"]),
    fetchData() {
      const { fetch } = board;

      this.isLoading = true;

      fetch()
        .then(res => (this.boards = res.list))
        .finally(() => (this.isLoading = false));
    },
    showAddBoard() {
      this.SET_ADD_BOARD_SHOW(true);
    },
    onAddBoard(title) {
      const { create } = board;

      create(title).then(res => {
        console.log("res", res);
        this.fetchData();
      });
    }
  }
};
</script>

<style>
.home-title {
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
}

.board-list {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  margin: 0 auto;
}

.board-item {
  width: 18%;
  height: 100px;
  margin: 0 2% 20px 0;
  border-radius: 3px;
}

.board-item-new {
  background-color: #ddd;
}

.board-item a {
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
}

.board-item a:hover,
.board-item a:focus {
  background-color: rgba(0, 0, 0, 0.1);
  color: #666;
}

.board-item-title {
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
}

.board-item a.new-board-btn {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  height: 100px;
  width: inherit;
  color: #888;
  font-weight: 700;
  cursor: pointer;
}
</style>
