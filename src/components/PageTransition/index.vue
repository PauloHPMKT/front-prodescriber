<script setup lang="ts">
import { computed } from 'vue';
import loadingBot from "../../assets/lottie_animations/loadingBot.json";
import { useHelpers } from "../../composables/useHelpers";

const { truncateText } = useHelpers();

interface LoadingProps {
  username: string;
}
const props = defineProps<LoadingProps>();

const loadingTitle = computed(() => (
  localStorage.getItem('access_token')
   ? `Olá ${truncateText(String(props.username))}, que bom te ver por aqui!`
   : 'Carregando Login...'
));
</script>

<template>
  <div class="h-screen flex justify-center items-center bg-white"> 
    <div>
      <Vue3Lottie              
        :animationData="loadingBot"
        :height="150"
        :width="150"
        :loop="true"
        :speed="3"
      />
      <span class="text-gray-950 font-semibold text-[20px]">
        {{ loadingTitle }}
      </span>
    </div>
  </div>
</template>