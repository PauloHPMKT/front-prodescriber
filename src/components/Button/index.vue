<script setup lang="ts">
const emit = defineEmits(["action"]);

const action = () => {
  emit("action");
};
</script>

<template>
  <button @click="action">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
button {
  padding: 0 16px;
  height: 35px;
  border-radius: 6px;
  border: 1px solid transparent;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}
</style>
