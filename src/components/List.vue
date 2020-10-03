<template>
  <div class="list">
    <div class="list-header">
      <div class="list-header-title">{{ data.title }}</div>
    </div>

    <div class="card-list">
      <CardItem v-for="card in data.cards" :key="card.id" :data="card" />
    </div>

    <div v-if="isAddCardShow">
      <AddCard :listId="data.id" @close="close" />
    </div>
    <div v-else>
      <a href="" class="add-card-btn" @click.prevent.stop="open">
        Add a Card...
      </a>
    </div>
  </div>
</template>

<script>
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
      isAddCardShow: false
    };
  },
  methods: {
    close() {
      this.isAddCardShow = false;
    },
    open() {
      this.isAddCardShow = true;
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
  overflow-y: scroll;
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
