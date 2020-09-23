<template>
  <div>
    Card
    <div>bid: {{ bid }}</div>
    <div v-if="isLoading">loading Card ...</div>
    <div v-else>cid: {{ cid }}</div>
  </div>
</template>

<script>
export default {
  name: "card",
  data() {
    return {
      isLoading: true
    };
  },
  computed: {
    cid() {
      return this.$route.params.cid;
    },
    bid() {
      return this.$route.params.bid;
    }
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: {
      handler: "fetchData",
      immediate: true
    }
  },
  methods: {
    fetchData() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    }
  }
};
</script>

<style></style>
