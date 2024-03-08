import {
  NavigationGuardNext,
  RouteLocation,
  createRouter,
  createWebHistory,
} from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import NotFoundPage from "../views/NotFoundPage.vue";
import pageStructure from "../templates/pageStructure.vue";
import ConnectionDown from "../views/ConnectionDown.vue";
import genDescription from "../views/workspace/genDescription.vue";
// import ListDescription from "../views/workspace/ListDescription.vue";
// import UserProfile from "../views/workspace/UserProfile.vue";

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
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
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
          component: () => import("../views/workspace/Dashboard.vue"),
          props: (router) => ({ description: router.query.description }),
        },
        {
          path: "gen-descriptions",
          name: "description",
          component: genDescription,
        },
        // {
        //   path: "gen-list-descriptions",
        //   name: "list_description",
        //   component: ListDescription,
        // },
        // {
        //   path: "profile/:id",
        //   name: "userprofile",
        //   component: UserProfile,
        // },
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
