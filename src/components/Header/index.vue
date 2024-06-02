<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import MainButton from "../Button/index.vue";

import { useAuthStore } from "../../store";
import logo from "../../assets/img/ProDescriber-dark.png";
import Container from "../../templates/container.vue";

const router = useRouter();
const authStore = useAuthStore();

const toLogin = () => {
  const TIME_TO_REDIRECT = 3000;
  authStore.changeLoaderPage(true)
  setTimeout(() => {
    const userStoraged = localStorage.getItem("access_token");  
    if (!!userStoraged) {
      router.push({ name: "dashboard" });
      authStore.changeLoaderPage(false)
      return;
    }
    router.push({ name: "login" });
    authStore.changeLoaderPage(false)
  }, TIME_TO_REDIRECT);
};
</script>

<template>
  <header class="fixed z-10 top-0 w-full h-24 border-b-2 border-b-gray-1050a bg-dark-1000a backdrop-blur">
    <Container class="flex justify-between items-center h-full">
      <div class="w-56 py-2 flex justify-center items-center">
        <img :src="logo" alt="Logo ProDescriber" class="w-full"/>
      </div>
      <main-button 
        class="py-2 border-2 border-gray-1050 bg-gray-1000 text-white" 
        @action="toLogin"
      >
        Acessar workspace
        <Icon icon="tabler:user-up" class="ml-2" />
      </main-button>
    </Container>
  </header>
</template>
