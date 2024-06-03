<script setup lang="ts">
import { onMounted, computed } from "vue";
import MainHeader from "../components/Header/index.vue";
import Container from "../templates/container.vue";
import Default from "../templates/default.vue";
import Hero from "../components/site/Hero.vue";
import About from "../components/site/About.vue";
import SiteFooter from "../components/site/Footer.vue";
import PageTransition from "../components/PageTransition/index.vue";
import { useAuthStore } from "../store";
import { useOpenAIStore } from "../store/openai";
import { useOnMounted } from "../composables/useOnMounted";

const authStore = useAuthStore();
const { cleanStore } = useOpenAIStore();
const { removeStoreOnLoad } = useOnMounted();

const isStoragedUser = computed(() => {
  const userStoraged = localStorage.getItem("access_token");
  return !!userStoraged
    ? authStore.$state.currentUser.username
    : "Carregando workspace...";

})

onMounted(() => {
  removeStoreOnLoad(cleanStore());
  authStore.$state.pageTransition = false;
});
</script>

<template>
  <transition name="fade">
    <PageTransition 
      v-if="authStore.$state.pageTransition" 
      :username="isStoragedUser!" 
    />
    <div v-else class="pt-8 absolute w-full">
      <MainHeader />
      <Container>
        <div class="banner_bg w-1/2 h-4/5"></div>
        <main>
          <default>
            <Hero />
          </default>
          <default>
            <About />
          </default>
        </main>
      </Container>
      <SiteFooter />
    </div>
  </transition> 
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.banner_bg {
  background-image: url("../assets/img/dashed_bg.svg");
  background-size: 100px;
  position: absolute;
  top: -50%;
  left: 20%;
  z-index: 10;
  transform: translate(-50%);
}
</style>
