<script setup lang="ts">
import { ref } from 'vue';

interface PopoverProps {
  message: string;
}

defineProps<PopoverProps>();

const isVisible = ref<boolean>(true);

const closePopoveer = () => {
  isVisible.value = false;
};
</script>

<template>
  <div class="bg-slate-800 p-2 rounded-[6px] shadow-lg min-w-56 text-slate-400">
    <div @click="closePopoveer" class="underline cursor-pointer border-b-2 border-slate-900 pb-5 pt-3">
      Clique aqui para fechar
    </div>
    <div class="mt-3">
      {{ message }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.jumping {
  animation: jumpAnimation 0.5s ease-in-out;
}

@keyframes jumpAnimation {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}

.hidden {
  display: none;
}
</style>
