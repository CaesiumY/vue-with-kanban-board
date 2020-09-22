<template>
  <div>
    Card
    <div>bid: {{ bid }}</div>
    <div>cid: {{ cid }}</div>
  </div>
</template>

<script>
export default {
  name: "card",
  data() {
    return {};
  },
  computed: {
    cid() {
      return this.$route.params.cid;
    },
    bid() {
      return this.$route.params.bid;
    }
  }
};
</script>

<style></style>
