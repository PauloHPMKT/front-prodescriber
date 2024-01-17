<script setup lang="ts">
import SidebarPlugins from "./SidebarPlugins.vue";
import logo from "../../assets/img/logo_prodescriber.png";
import { useRouter } from "vue-router";

const router = useRouter();

const navigateToDashboard = () => {
  router.push({ name: "dashboard" });
};
</script>

<template>
  <aside>
    <div @click="navigateToDashboard" class="image_container">
      <img :src="logo" alt="Logo ProDescriber" />
    </div>
    <nav>
      lista de menu
      <sidebar-plugins />
    </nav>
  </aside>
</template>

<style scoped lang="scss">
aside {
  width: 15%;
  background-color: #121212;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;

  .image_container {
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    img {
      width: 80%;
    }
  }

  nav {
    background-color: red;
  }
}
</style>
