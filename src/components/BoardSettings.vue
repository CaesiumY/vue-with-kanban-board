<template>
  <div class="board-menu">
    <div class="board-menu-header">
      <div class="header-title">Menu</div>
      <a href="" class="header-close-btn" @click.prevent="onClose">&times;</a>
    </div>
    <ul class="menu-list">
      <li>
        <a class="delete-btn" @click.prevent="onDeleteBoard">Delete Board</a>
      </li>
      <li>
        <span>Change Background</span>
      </li>

      <div class="color-picker">
        <a
          href=""
          data-color="rgb(0, 121, 191)"
          @click.prevent="onChangeTheme"
        ></a>
        <a
          href=""
          data-color="rgb(210, 144, 52)"
          @click.prevent="onChangeTheme"
        ></a>
        <a
          href=""
          data-color="rgb(81, 152, 57)"
          @click.prevent="onChangeTheme"
        ></a>
        <a
          href=""
          data-color="rgb(176, 70, 50)"
          @click.prevent="onChangeTheme"
        ></a>
        <a
          href=""
          data-color="palevioletred"
          @click.prevent="onChangeTheme"
        ></a>
        <a href="" data-color="skyblue" @click.prevent="onChangeTheme"></a>
      </div>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      board: "board"
    })
  },
  mounted() {
    document.querySelectorAll(".color-picker a").forEach(item => {
      item.style.backgroundColor = item.dataset.color;
    });
  },
  methods: {
    ...mapActions({
      DELETE_BOARD: "DELETE_BOARD",
      UPDATE_BOARD: "UPDATE_BOARD"
    }),
    ...mapMutations({
      SET_IS_SHOW_BOARD_SETTINGS: "SET_IS_SHOW_BOARD_SETTINGS",
      SET_THEME: "SET_THEME"
    }),
    onClose() {
      this.SET_IS_SHOW_BOARD_SETTINGS(false);
    },
    onDeleteBoard() {
      if (!window.confirm(`Are you sure to Delete ${this.board.title}?`))
        return;

      this.DELETE_BOARD({ id: this.board.id }).then(() => {
        this.$router.push("/");
      });
    },
    onChangeTheme(e) {
      const bgColor = e.target.dataset.color;
      this.UPDATE_BOARD({ id: this.board.id, bgColor }).then(() =>
        this.SET_THEME(bgColor)
      );
    }
  }
};
</script>

<style>
.board-menu {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  background-color: #edeff0;
  width: 310px;
  transition: all 0.3s;
  box-shadow: -5px 0px 3px rgba(0, 0, 0, 0.1);
}

.board-menu-header {
  height: 46px;
  padding: 0 6px 0 12px;
  border-bottom: #bbb solid 1px;
}

.header-title {
  font-size: 18px;
  text-align: center;
  line-height: 46px;
  font-weight: 700;
}

.header-close-btn {
  position: absolute;
  top: 5px;
  right: 10px;
  text-decoration: none;
  font-size: 26px;
  color: #999;
}

.header-close-btn:hover,
.header-close-btn:focus {
  color: #000;
}

.menu-list {
  list-style: none;
  padding-left: 0px;
}

.menu-list li * {
  display: block;
  height: 18px;
  line-height: 18px;
  padding: 10px;
  margin: 5px;
  border-radius: 3px;
  font-size: 18px;
  font-weight: 700;
  color: #111;
  margin-bottom: 5px;
  cursor: pointer;
}

.menu-list li *:hover,
.menu-list li *:focus {
  background-color: rgba(0, 0, 0, 0.1);
}

.menu-list li a {
  text-decoration: none;
  color: inherit;
}

.menu-list li .delete-btn {
  color: red;
}

.color-picker {
  margin: 15px;
}

.color-picker a {
  display: inline-block;
  width: 49%;
  height: 100px;
  border-radius: 8px;
}

.color-picker a:hover,
.color-picker a:focus {
  opacity: 0.8;
}
</style>
