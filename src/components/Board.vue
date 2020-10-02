<template>
  <div>
    <div class="board-wrapper">
      <div class="board">
        <div class="board-header">
          <span class="board-title">{{ board.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "board",
  data() {
    return {
      bid: 0,
      isLoading: true
    };
  },
  computed: {
    ...mapState({
      board: "board"
    })
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions({
      FETCH_BOARD: "FETCH_BOARD"
    }),
    fetchData() {
      this.isLoading = true;
      this.bid = this.$route.params.bid;

      this.FETCH_BOARD({ id: this.bid }).then(() => {
        this.isLoading = false;
        console.log("board", this.board);
      });
    }
  }
};
</script>

<style>
.board-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.board {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.board-header {
  flex: none;
  padding: 8px 4px 8px 8px;
  margin: 0;
  height: 32px;
  line-height: 32px;
}

.board-header input[type="text"] {
  width: 200px;
}

.board-header-btn {
  border-radius: 4px;
  padding: 2px 10px;
  height: 30px;
  margin-bottom: 15px;
  display: inline-block;
  color: #fff;
}

.boarder-header-btn:hover,
.boarder-header-btn:focus {
  background-color: rgba(0, 0, 0, 0.15);
  cursor: pointer;
}

.board-title {
  font-weight: 700;
  font-size: 18px;
}

.show-menu {
  font-size: 14px;
  position: absolute;
  right: 15px;
}

.list-section-wrapper {
  flex-grow: 1;
  position: relative;
}

.list-section {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 0 10px;
}

.list-wrapper {
  display: inline-block;
  height: 100%;
  width: 272px;
  vertical-align: top;
  margin-right: 5px;
}

.card-item.gu-transit {
  background-color: #555 !important;
}

.card-item.gu-mirror {
  opacity: 1 !important;
  background-color: #fff !important;
  transform: rotate(3deg) !important;
}
</style>
