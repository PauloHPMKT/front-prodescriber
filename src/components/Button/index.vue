<script setup lang="ts">
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  class?: string;
}

const emit = defineEmits(["action"]);
const props = defineProps<ButtonProps>();

const action = () => {
  emit("action");
};
</script>

<template>
  <button 
    @click="action" 
    :class="twMerge(
      `py-1 px-2 border-transparent text-[1rem] cursor-pointer inline-flex justify-center items-center rounded-md`, 
      props.class
    )"  
  >
    <slot></slot>
  </button>
</template>
