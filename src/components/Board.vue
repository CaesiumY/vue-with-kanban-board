<template>
  <div>
    Board

    <div v-if="isLoading">Loading Board Data ...</div>

    <div v-else>
      <div>
        {{ bid }}
      </div>

      <router-link :to="`/board/${bid}/card/1`">
        Card 1
      </router-link>

      <router-link :to="`/board/${bid}/card/2`">
        Card 2
      </router-link>
    </div>
    <hr />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "board",
  data() {
    return {
      bid: 0,
      isLoading: true
    };
  },

  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.bid = this.$route.params.bid;
      }, 500);
    }
  }
};
</script>

<style></style>
