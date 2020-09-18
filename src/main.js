import Vue from "vue";
import App from "./App.vue";

const Login = {
  template: "<div>Login Page</div>"
};

const routes = {
  "/": App,
  "/login": Login
};

new Vue({
  el: "#app",
  computed: {
    VueComponent() {
      console.log(
        "route",
        routes[window.location.pathname] || {
          template: "<div>Page Not Found</div>"
        }
      );
      return (
        routes[window.location.pathname] || {
          template: "<div>Page Not Found</div>"
        }
      );
    }
  },
  render(h) {
    h(this.VueComponent);
  }
});
