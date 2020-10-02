<template>
  <div>
    Board

    <div v-if="isLoading">Loading Board Data ...</div>

    <div v-else>
      <div>
        {{ bid }}
      </div>

      <pre>
        {{ board }}
      </pre>

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
import { mapActions, mapState } from "vuex";
export default {
  name: "board",
  data() {
    return {
      bid: 0,
      isLoading: true
    };
  },
  computed: {
    ...mapState({
      board: "board"
    })
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions({
      FETCH_BOARD: "FETCH_BOARD"
    }),
    fetchData() {
      this.isLoading = true;
      this.bid = this.$route.params.bid;

      this.FETCH_BOARD({ id: this.bid }).then(() => (this.isLoading = false));
    }
  }
};
</script>

<style></style>
