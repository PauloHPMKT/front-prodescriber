<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <div class="flex flex-col items-start my-5">
    <h2 class="font-semibold text-[1.5rem]">{{ title }}</h2>
  </div>
</template>