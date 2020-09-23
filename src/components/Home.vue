<template>
  <div>
    Home

    <div v-if="isLoading">Loading ...</div>
    <div v-else>Api Response: {{ apiResponse }}</div>

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
import axios from "axios";

export default {
  data() {
    return {
      isLoading: true,
      apiResponse: ""
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.isLoading = true;

      axios
        .get("http://localhost:3000/health")
        .then(res => (this.apiResponse = res.data))
        .catch(e => (this.apiResponse = e))
        .finally(() => (this.isLoading = false));
    }
  }
};
</script>

<style></style>
