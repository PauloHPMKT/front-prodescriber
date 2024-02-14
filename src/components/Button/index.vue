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
  padding: 5px 10px;
  border-radius: 20px;
  border: 1px solid transparent;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
</style>
