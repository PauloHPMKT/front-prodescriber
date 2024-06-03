<script setup lang="ts">
import { Icon } from "@iconify/vue"; 
import MainButton from "../Button/index.vue";
import { useNavigation } from "../../composables/useNavigarion";
import proDescriberBanner from '../../assets/img/ProDescriber-banner.png';
import gemini from '../../assets/img/gemini.png';

const { registration } = useNavigation();
</script>

<template>
  <div class="flex text-black mt-40">
    <div class="w-1/2 pr-24">
      <h1 class="text-4xl font-bold leading-tight mb-8">
        Seu parceiro confiável para gestão de recursos no seu negócio!
      </h1>
      <p class="leading-normal text-lg pb-8">
        Crie descrições de alta qualidade e totalmente SEO-friendly para
        seu produto e impulsione suas vendas. Experimente já o
        ProDescriber!
      </p>
      <MainButton @click="registration" class="py-2 border-2 border-gray-1050 bg-gray-1000 text-white">
        Comece agora Gratuitamente
        <Icon :icon="'tabler:wand'" class="ml-2" />
      </MainButton>
      <div class="pt-8 flex items-center">
        <p>Utilizamos todo o poder do</p>
        <img :src="gemini" alt="Gemini logo" class="w-24 ml-2" />
      </div>
    </div>
    <div class="w-1/2">
      <img :src="proDescriberBanner" alt="introdução ProDescriber" class="w-full" />
    </div>
  </div>
</template>
