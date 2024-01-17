import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/workspace/dashboard.vue";
import pageStructure from "../templates/pageStructure.vue";
import usersVue from "../views/workspace/users.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/app",
      name: "template",
      redirect: "/app/dashboard",
      component: pageStructure,
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: Dashboard,
        },
        {
          path: "users",
          name: "users",
          component: usersVue,
        },
      ],
    },
  ],
});

export default router;
