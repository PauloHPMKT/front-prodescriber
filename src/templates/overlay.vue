<script setup lang="ts"></script>

<template>
  <div class="overlay">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 300;
  background-color: rgba(18, 18, 18, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
