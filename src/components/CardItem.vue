<template>
  <div class="card-item" :data-card-id="data.id" :data-pos="data.pos">
    <router-link :to="`/board/${boardId}/card/${data.id}`">
      <div>{{ data.title }}</div>
      <div class="card-item-meta" v-if="data.description">&equiv;</div>
    </router-link>
    <a href="" class="delete-card-btn" @click.prevent="onDeleteCard">&times;</a>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: ["data"],
  computed: {
    ...mapState({
      boardId: state => state.board.id
    })
  },
  methods: {
    ...mapActions({
      DELETE_CARD: "DELETE_CARD"
    }),
    onDeleteCard() {
      if (
        window.confirm(
          `Are you sure to Delete this Card? < ${this.data.title} >`
        )
      ) {
        this.DELETE_CARD({ id: this.data.id });
      }
    }
  }
};
</script>

<style>
.card-item {
  background-color: #fff;
  border-radius: 3px;
  margin: 8px;
  box-shadow: 0 2px 0 #ccc;
  position: relative;
}

.card-item a {
  text-decoration: none;
  color: #444;
  word-wrap: break-word;
  white-space: normal;
  overflow: hidden;
  padding: 6px 10px 8px;
}

.card-item a:first-child {
  display: block;
}

.card-item:hover,
.card-item:focus {
  background-color: rgba(0, 0, 0, 0.05);
  cursor: pointer;
}

.card-item-meta {
  font-size: 26px;
  color: #8c8c8c;
}

.delete-card-btn {
  display: none;
  position: absolute;
  right: 0px;
  top: -5px;
  text-decoration: none;
  font-size: 22px;
  color: #aaa;
}

.card-item:hover .delete-card-btn,
.card-item:focus .delete-card-btn {
  display: block;
}

.delete-card-btn:hover,
.delete-card-btn:focus {
  color: #000;
}
</style>
