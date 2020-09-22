<template>
  <div>
    Board
    <div>
      {{ bid }}
    </div>

    <router-link :to="`/board/${bid}/card/1`">
      Card 1
    </router-link>

    <router-link :to="`/board/${bid}/card/2`">
      Card 2
    </router-link>

    <hr />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "board",
  data() {
    return {
      bid: 0
    };
  },

  created() {
    this.bid = this.$route.params.bid;
  }
};
</script>

<style></style>
