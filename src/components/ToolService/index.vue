<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { NavigatePathsProps } from "../../types/interfaces";
import { useRouter } from "vue-router";

defineProps<NavigatePathsProps>();

const redirect = useRouter();

const toRouter = (path: string) => {
  redirect.push(path);
};
</script>

<template>
  <div @click="toRouter(router)" class="card">
    <header class="flex items-start mb-4">
      <div class="bg-slate-300 p-2 rounded">
        <Icon :icon="`tabler:${icon}`" class="text-slate-800" />
      </div>
      <h3 class="ml-3 font-semibold text-zinc-900">{{ description }}</h3>
    </header>
    <div>
      <p>{{ content }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  @apply shadow-md 
    bg-white 
    w-[24.2%] 
    rounded-lg 
    p-2 
    h-[10rem] 
    cursor-pointer 
    border-2 
    border-white 
    hover:border-slate-300;
}
</style>
