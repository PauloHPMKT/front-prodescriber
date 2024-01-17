<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { navigatePaths } from "../../routers/navigate-paths";
import { useRoute } from "vue-router";

const router = useRoute();

const isRouteActive = (route: string) => {
  return router.path === route;
};
</script>

<template>
  <nav>
    <ul>
      <li
        v-for="link in navigatePaths"
        :key="link.id"
        :class="{ active: isRouteActive(link.router) }"
      >
        <router-link :to="{ path: `${link.router}` }" exact>
          <Icon :icon="`carbon:${link.icon}`" />
          <span>{{ link.description }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
nav {
  color: aliceblue;

  ul {
    li {
      margin: 3px 0;
      transition: 0.3s ease-in-out;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      font-size: 1rem;

      a {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 15px;

        svg {
          margin-right: 10px;
        }
      }

      &.active {
        background-color: #e7e6e8;
        color: #121212;
      }
    }
  }
}
</style>
