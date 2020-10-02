<template>
  <div class="add-card" v-click-outside="close">
    <form @submit.prevent="onSubmit">
      <input
        type="text"
        class="form-control"
        ref="inputText"
        placeholder="Enter a title for this Card..."
        v-model="inputTitle"
      />
      <div>
        <button
          class="btn"
          :class="{ 'btn-success': !isInvalid }"
          :disabled="isInvalid"
          type="submit"
        >
          Add Card
        </button>
        <a href="" class="cancel-add-btn" @click.prevent="close">&times;</a>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputTitle: ""
    };
  },
  computed: {
    isInvalid() {
      return !this.inputTitle.trim();
    }
  },
  mounted() {
    this.$refs.inputText.focus();
  },
  methods: {
    close() {
      this.$emit("close");
    },
    onSubmit() {
      console.log("submit");
      if (this.inputTitle) {
        // 인풋이 존재할 때만 제출
        console.log("input:", this.inputTitle);
      }
      this.close();
    }
  }
};
</script>

<style>
.add-card {
  padding: 10px;
  display: block;
  position: relative;
}

.add-card .cancel-add-btn {
  display: inline-block;
  margin-top: -10px;
  margin-left: 10px;
  vertical-align: middle;
  text-decoration: none;
  color: #888;
  font-size: 30px;
}

.add-card .cancel-add-btn:hover,
.add-card .cancel-add-btn:focus {
  color: #444;
}

.add-card .btn {
  background-color: #aaa;
}
</style>
