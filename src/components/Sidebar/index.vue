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
  <aside class="w-[18%] px-3 bg-dark-1000 min-h-screen">
    <div @click="navigateToDashboard" class="image_container">
      <img :src="logo" alt="Logo ProDescriber" />
    </div>
    <sidebar-plugins />
  </aside>
</template>

<style scoped lang="scss">
.image_container {
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-bottom: 5px;
  border-bottom: 1px solid #6767676f;

  img {
    width: 80%;
  }
}
</style>
