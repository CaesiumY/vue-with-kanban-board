import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Board from "../components/Board.vue";
import Card from "../components/Card.vue";
import NotFound from "../components/NotFound.vue";

import { AUTH_TOKEN } from "../api";

Vue.use(VueRouter);

const getAuth = (to, from, next) => {
  const isAuth = localStorage.getItem(AUTH_TOKEN);
  const loginPath = `/login?rPath=${encodeURI(to.path)}`;

  isAuth ? next() : next(loginPath);
};

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Home,
      beforeEnter: getAuth
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/board/:bid",
      component: Board,
      beforeEnter: getAuth,
      children: [
        {
          path: "card/:cid", // '/' 로 시작하는 주소는 루트를 뜻함
          component: Card,
          beforeEnter: getAuth
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
