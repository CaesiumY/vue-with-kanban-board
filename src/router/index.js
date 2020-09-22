import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Board from "../components/Board.vue";
import Card from "../components/Card.vue";
import NotFound from "../components/NotFound.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/board/:bid",
      component: Board,
      children: [
        {
          path: "card/:cid", // '/' 로 시작하는 주소는 루트를 뜻함
          component: Card
        }
      ]
    },
    {
      path: "*",
      component: NotFound
    }
  ]
});

export default router;
