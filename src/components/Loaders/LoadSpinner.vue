<script setup lang="ts">
import { LoaderProps } from "../../types/interfaces";

defineProps<LoaderProps>();
</script>

<template>
  <div class="loader-container">
    <div class="loader"></div>
    <p>{{ loader_description }}</p>
  </div>
</template>

<style scoped lang="scss">
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .loader {
    width: 65px;
    height: 65px;
    border: 5px solid #fff;
    border-top: 5px solid #121212;
    filter: drop-shadow(0 0 5px #ffffff33);
    border-radius: 50%;
    animation: roll 1s linear infinite;
    text-align: center;
  }

  p {
    margin-top: 30px;
    color: #f0f0f0;
  }

  @keyframes roll {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
