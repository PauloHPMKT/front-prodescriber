import {
  NavigationGuardNext,
  RouteLocation,
  createRouter,
  createWebHistory,
} from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import NotFoundPage from "../views/NotFoundPage.vue";
import Dashboard from "../views/workspace/dashboard.vue";
import pageStructure from "../templates/pageStructure.vue";
import ConnectionDown from "../views/ConnectionDown.vue";
import genDescription from "../views/workspace/genDescription.vue";

const authGuard =
  () => (to: RouteLocation, from: RouteLocation, next: NavigationGuardNext) => {
    if (localStorage.getItem("access_token") || "") {
      next();
    } else {
      next("/");
    }
  };

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
      beforeEnter: authGuard(),
      component: pageStructure,
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: Dashboard,
          props: (router) => ({ description: router.query.description }),
        },
        {
          path: "gen-descriptions",
          name: "description",
          component: genDescription,
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: NotFoundPage,
    },
    {
      path: "/index",
      name: "connectionrefused",
      component: ConnectionDown,
    },
  ],
});

export default router;
