<template>
  <div class="login">
    <h2>Log in to Trello</h2>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          class="form-control"
          v-model="email"
          autofocus
          placeholder="e.g., test@test.com"
        />
      </div>
      <div>
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          class="form-control"
          v-model="password"
          placeholder="123123"
        />
      </div>

      <button
        class="btn"
        :class="{ 'btn-success': !invalidForm }"
        :disabled="invalidForm"
      >
        Log In
      </button>
    </form>

    <p class="error" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
      rPath: ""
    };
  },
  created() {
    this.rPath = this.$route.query.rPath || "/";
  },

  computed: {
    invalidForm() {
      return !this.email || !this.password;
    }
  },

  methods: {
    ...mapActions(["SET_LOGIN"]),
    onSubmit() {
      this.SET_LOGIN({ email: this.email, password: this.password })
        .then(res => this.$router.push(this.rPath))
        .catch(e => (this.error = e.data.error));
    }
  }
};
</script>

<style>
.login {
  width: 400px;
  margin: 0 auto;
}

.error {
  color: #f00;
}
</style>
