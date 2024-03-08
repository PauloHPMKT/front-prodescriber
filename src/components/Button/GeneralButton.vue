<script setup lang="ts">
interface GeneralButtonProps {
  action: () => void;
}

defineEmits<GeneralButtonProps>();
</script>

<template>
  <button class="bg-black text-white px-4 py-2 rounded-md" @click="action">
    <slot></slot>
  </button>
</template>
