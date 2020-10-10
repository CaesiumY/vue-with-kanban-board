<template>
  <div>
    <div class="board-wrapper">
      <div class="board">
        <div class="board-header">
          <input
            type="text"
            class="board-title"
            :readonly="!isEditTitle"
            :value="board.title"
            @click="isEditTitle = true"
            @blur="onSubmitTitle"
            @keyup.enter="onSubmitTitle"
            ref="inputTitle"
          />
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
              :key="list.id"
              :data-list-id="list.id"
            >
              <List :data="list" />
            </div>
            <div class="list-wrapper undraggable">
              <AddList />
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
import AddList from "./AddList";
import BoardSettings from "./BoardSettings";
import dragger from "../utils/dragger";

export default {
  name: "board",
  components: {
    List,
    AddList,
    BoardSettings
  },
  data() {
    return {
      bid: 0,
      isLoading: true,
      dragulaCard: null,
      dragulaList: null,
      isEditTitle: false
    };
  },
  computed: {
    ...mapState({
      board: "board",
      bodyColor: "bodyColor",
      isShowBoardSettings: "isShowBoardSettings"
    })
  },
  watch: {
    bodyColor: "setBodyTheme"
  },
  created() {
    this.fetchData().then(() => {
      this.setBodyTheme(this.board.bgColor);
    });
  },
  updated() {
    this.setCardDraggable();
    this.setListDraggable();
  },
  methods: {
    ...mapMutations({
      SET_THEME: "SET_THEME",
      SET_IS_SHOW_BOARD_SETTINGS: "SET_IS_SHOW_BOARD_SETTINGS"
    }),
    ...mapActions({
      FETCH_BOARD: "FETCH_BOARD",
      UPDATE_CARD: "UPDATE_CARD",
      UPDATE_BOARD: "UPDATE_BOARD",
      UPDATE_LIST: "UPDATE_LIST"
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
    onSubmitTitle(e) {
      const title = e.target.value.trim();
      this.isEditTitle = false;

      if (!title || title === this.board.title) return;

      this.UPDATE_BOARD({ id: this.board.id, title });
    },
    setCardDraggable() {
      if (this.dragulaCard) this.dragulaCard.destroy();

      const options = {};

      this.dragulaCard = dragger.init(
        Array.from(this.$el.querySelectorAll(".card-list")),
        options
      );

      this.dragulaCard.on("drop", (el, target, source, sibling) => {
        // 이벤트 리스너 등록(el은 드래그하는 요소, target은 위에서 등록한 리스트)
        const targetCard = {
          id: el.dataset.cardId * 1,
          listId: target.parentNode.dataset.listId * 1,
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
        console.log("setCardDraggable -> targetCard", targetCard);
      });
    },
    setListDraggable() {
      if (this.dragulaList) this.dragulaList.destroy();

      const options = {
        invalid: (el, handle) => {
          return !/^list/.test(handle.className); // 클릭한 요소(handle)의 클래스가 list로 시작하는지 test()해서 true false 반환
        }
      };

      this.dragulaList = dragger.init(
        Array.from(this.$el.querySelectorAll(".list-section")),
        options
      );

      this.dragulaList.on("drop", (el, target, source, sibling) => {
        // 이벤트 리스너 등록(el은 드래그하는 요소, target은 위에서 등록한 리스트)
        const targetList = {
          id: el.dataset.listId * 1,
          pos: 65535
        }; // api업데이트시 쓰일 객체 생성

        const { prev, next } = dragger.setSiblings({
          el,
          target,
          items: target.querySelectorAll(".list"),
          type: "list"
        });

        // 자리가 맨 위일 경우
        if (!prev && next) targetList.pos = next.dataset.pos / 2;
        // 자리가 사이일 경우
        else if (prev && next)
          targetList.pos = prev.dataset.pos / 2 + next.dataset.pos / 2;
        // 자리가 맨 아래일 경우
        else if (prev && !next) targetList.pos = prev.dataset.pos * 2;

        this.UPDATE_LIST(targetList);
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

.board-title:read-only {
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
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
