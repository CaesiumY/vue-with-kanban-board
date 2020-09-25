<template>
  <div>
    Home

    <div v-if="isLoading">Loading ...</div>
    <div v-else>Api Response: {{ boards }}</div>

    <div>
      Board List
      <ul>
        <li>
          <router-link to="/board/1">board 1</router-link>
          <router-link to="/board/2">board 2</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { board } from "../api";

export default {
  data() {
    return {
      isLoading: true,
      boards: ""
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const { fetch } = board;

      this.isLoading = true;

      fetch()
        .then(res => (this.boards = res))
        .finally(() => (this.isLoading = false));
    }
  }
};
</script>

<style></style>
