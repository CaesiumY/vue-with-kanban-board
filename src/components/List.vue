<template>
  <div class="list" :data-list-id="data.id" :data-pos="data.pos">
    <div class="list-header">
      <input
        type="text"
        class="list-header-title"
        :value="data.title"
        :readonly="!isShowInputTitle"
        @click="onShowInputTitle"
        @blur="onBlurInputTitle"
        @keyup.enter="onSubmitInputTitle"
      />
    </div>

    <div class="card-list">
      <CardItem v-for="card in data.cards" :key="card.id" :data="card" />
    </div>

    <div v-if="isShowAddCard">
      <AddCard :listId="data.id" @close="close" />
    </div>
    <div v-else>
      <a href="" class="add-card-btn" @click.prevent.stop="open">
        &plus; Add a Card...
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import AddCard from "./AddCard";
import CardItem from "./CardItem";

export default {
  components: {
    AddCard,
    CardItem
  },
  props: ["data"],
  data() {
    return {
      isShowAddCard: false,
      isShowInputTitle: false
    };
  },
  methods: {
    ...mapActions({
      UPDATE_LIST: "UPDATE_LIST"
    }),
    close() {
      this.isShowAddCard = false;
    },
    open() {
      this.isShowAddCard = true;
    },
    onShowInputTitle() {
      this.isShowInputTitle = true;
    },
    onBlurInputTitle() {
      this.isShowInputTitle = false;
    },
    onSubmitInputTitle(e) {
      const title = e.target.value.trim();

      if (!title || title === this.data.title) return this.onBlurInputTitle();

      this.UPDATE_LIST({ id: this.data.id, title }).then(() =>
        this.onBlurInputTitle()
      );
    }
  }
};
</script>

<style>
.list {
  background-color: #e2e4e6;
  border-radius: 3px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  vertical-align: top;
  width: 100%;
  max-height: 100%;
}

.list-header {
  flex: 0 0 auto;
  height: 30px;
  padding: 10px 8px 0px;
  position: relative;
}

.list-header-title {
  font-size: 16px;
  font-weight: 700;
  padding-left: 8px;
  line-height: 30px;
}

.list-header-title:read-only {
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
}

.input-title {
  width: 90%;
}

.delete-list-btn {
  position: absolute;
  right: 10px;
  top: 8px;
  text-decoration: none;
  color: #aaa;
  font-size: 24px;
}

.card-list {
  flex: 1 1 auto;
  overflow-y: auto;
  min-height: 6px;
}

.empty-card-item {
  height: 10px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
}

.add-card-btn {
  flex: 0 0 auto;
  display: block;
  padding: 8px 10px;
  color: #8c8c8c;
  text-decoration: none;
  font-size: 15px;
}

.add-card-btn:hover,
.add-card-btn:focus {
  background-color: rgba(0, 0, 0, 0.1);
  text-decoration: underline;
}
</style>
