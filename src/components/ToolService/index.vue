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
    <header class="flex items-start">
      <div class="bg-black p-2 rounded-full">
        <Icon :icon="`tabler:${icon}`" class="text-white" />
      </div>
    </header>
    <h3 class="font-semibold text-zinc-900 my-2">{{ description }}</h3>
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
    rounded-[18px] 
    p-2 
    h-[10.5rem] 
    cursor-pointer 
    border-2 
    border-white 
    hover:border-slate-300;
}
</style>
