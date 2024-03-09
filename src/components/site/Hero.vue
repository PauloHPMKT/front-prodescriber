<script setup lang="ts">
import { Icon } from "@iconify/vue"; 
import { useRouter } from 'vue-router';
import MainButton from "@/components/Button/index.vue";

const router = useRouter();

const registration = () => {
  if (localStorage.getItem("access_token")) {
    router.push({ name: "dashboard" });
    return;
  }
  return router.push({ name: "register" });
};
</script>

<template>
  <div class="w-[80%] m-auto text-center py-10">
    <h1 class="text-4xl font-semibold leading-tight mb-9">
      <span class="text-slate-300 font-medium">ProDescriber</span>, seu
      parceiro confiável para criação de descrições de produtos!
    </h1>
    <p class="leading-normal text-lg px-20 pb-10">
      Crei descrições de alta qualidade e totalmente SEO-friendly para
      seu produto e impulsione suas vendas. Experimente já o
      ProDescriber!
    </p>
    <div class="mt-8">
      <MainButton @click="registration" class="bg-button text-white">
        Comece agora Gratuitamente
        <Icon :icon="'tabler:wand'" />
      </MainButton>
    </div>
    <!-- <div id="demo" v-if="showDemo">
      <transition name="slide-fade">
        <main-button
          v-if="show === false"
          @click="show = !show"
          class="bg-button text-white"
        >
          Comece agora Gratuitamente
          <Icon :icon="'tabler:wand'" />
        </main-button>
        <form-description v-else @submit="submitDescription" />
      </transition>
    </div>
    <div v-else>
      <div v-if="loading" style="text-align: center">
        <div class="loader_container">
          <load-spinner
            :loader_description="'Aguarde enquanto geramos a sua descrição perfeita!'"
          />
        </div>
      </div>
      <description v-else>
        <breadcrumb-buttons
          :buttons="breadcrumbButtons"
          @actions="triggerActions"
        />
      </description>
    </div> -->
  </div>
</template>

<style scoped lang="scss">
.bg-button {
  position: absolute;
  transform: translate(-50%);
  z-index: 2000;
  padding-top: 7px;
  padding-bottom: 7px;
  border: 1px solid #c5c5c51c;
  background-image: linear-gradient(45deg, #202020, #292727);
  transition: all 0.3s ease-out;

  &:hover {
    filter: drop-shadow(0 0 0.4rem #028a616e);
    cursor: pointer;
  }

  svg {
    margin-left: 10px;
    font-size: 1.2rem;
  }
}

/* .content {
  .slide-fade-enter-active {
    transition: all 0.4s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }

  .loader_container {
    margin: 30px auto;
    padding: 30px;
    width: 600px;
    border-radius: 8px;
  }
} */
</style>