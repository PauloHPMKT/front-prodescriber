<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { NavigatePathsProps } from "../../types/interfaces";

defineProps<NavigatePathsProps>();
</script>

<template>
  <div
    class="shadow-md bg-white w-[24.2%] rounded-lg p-6 h-[13rem] border-2 border-white hover:border-slate-300"
  >
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
