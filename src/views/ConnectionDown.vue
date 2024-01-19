<script setup lang="ts">
import disconnected from "../assets/lottie_animations/disconnected.json";
</script>

<template>
  <div class="container">
    <div class="content">
      <figure>
        <Vue3Lottie :animationData="disconnected" :height="220" :width="220" />
      </figure>
      <h1>Ops! Parece que você está sem conexão com a internet.</h1>
      <p>Verifique sua conexão e tente novamente.</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    text-align: center;

    figure {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 300px;
    }
  }
}
</style>
