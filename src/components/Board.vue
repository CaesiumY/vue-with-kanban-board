<template>
  <div>
    <div class="board-wrapper">
      <div class="board">
        <div class="board-header">
          <span class="board-title">{{ board.title }}</span>
          <a
            href=""
            class="board-header-btn show-menu"
            @click.prevent="onShowBoardSettings"
            >Show Menu</a
          >
        </div>

        <div class="list-section-wrapper">
          <div class="list-section">
            <div
              class="list-wrapper"
              v-for="list in board.lists"
              :key="list.pos"
            >
              <List :data="list" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <BoardSettings v-if="isShowBoardSettings" />
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import List from "./List";
import BoardSettings from "./BoardSettings";
import dragger from "../utils/dragger";

export default {
  name: "board",
  components: {
    List,
    BoardSettings
  },
  data() {
    return {
      bid: 0,
      isLoading: true,
      dragulaCard: null
    };
  },
  computed: {
    ...mapState({
      board: "board",
      bodyColor: "bodyColor",
      isShowBoardSettings: "isShowBoardSettings"
    })
  },
  created() {
    this.fetchData().then(() => {
      this.setBodyTheme(this.board.bgColor);
    });
  },
  updated() {
    this.setCardDraggable();
  },
  methods: {
    ...mapMutations({
      SET_THEME: "SET_THEME",
      SET_IS_SHOW_BOARD_SETTINGS: "SET_IS_SHOW_BOARD_SETTINGS"
    }),
    ...mapActions({
      FETCH_BOARD: "FETCH_BOARD",
      UPDATE_CARD: "UPDATE_CARD"
    }),
    setBodyTheme(color) {
      this.SET_THEME(color);
      document.querySelector("body").style.backgroundColor = color;
    },
    fetchData() {
      this.isLoading = true;
      this.bid = this.$route.params.bid;

      return this.FETCH_BOARD({ id: this.bid }).then(() => {
        this.isLoading = false;
        console.log("board", this.board);
      });
    },
    setCardDraggable() {
      if (this.dragulaCard) this.dragulaCard.destroy();

      this.dragulaCard = dragger.init(
        Array.from(this.$el.querySelectorAll(".card-list"))
      );

      this.dragulaCard.on("drop", (el, target, source, sibling) => {
        // 이벤트 리스너 등록(el은 드래그하는 요소, target은 위에서 등록한 리스트)
        const targetCard = {
          id: el.dataset.cardId * 1,
          pos: 65535
        }; // api업데이트시 쓰일 객체 생성

        const { prev, next } = dragger.setSiblings({
          el,
          target,
          items: target.querySelectorAll(".card-item"),
          type: "card"
        });

        // 자리가 맨 위일 경우
        if (!prev && next) targetCard.pos = next.dataset.pos / 2;
        // 자리가 사이일 경우
        else if (prev && next)
          targetCard.pos = prev.dataset.pos / 2 + next.dataset.pos / 2;
        // 자리가 맨 아래일 경우
        else if (prev && !next) targetCard.pos = prev.dataset.pos * 2;

        this.UPDATE_CARD(targetCard);
      });
    },
    onShowBoardSettings() {
      this.SET_IS_SHOW_BOARD_SETTINGS(true);
    }
  },
  beforeDestroy() {
    this.setBodyTheme("#fff");
    this.SET_IS_SHOW_BOARD_SETTINGS(false);
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

.show-menu:hover,
.show-menu:focus {
  background-color: rgba(0, 0, 0, 0.1);
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
