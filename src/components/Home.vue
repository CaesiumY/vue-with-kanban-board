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

      const req = new XMLHttpRequest();

      req.open("GET", "http://localhost:3000/health");

      req.send();

      req.addEventListener("load", () => {
        this.apiResponse = {
          status: req.status,
          statusText: req.statusText,
          response: req.response
        };

        this.isLoading = false;
      });
    }
  }
};
</script>

<style></style>
