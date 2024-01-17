<script setup lang="ts"></script>

<template>
  <router-view></router-view>
</template>

<style scoped lang="scss">
/* .fade-enter-active,
.fade-leave-active {
  transition: 400ms ease all;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-100px);
  max-width: 100%;
} */
/* --scrollbar */
::-webkit-scrollbar-track {
  background-color: #f4f4f4;
}
::-webkit-scrollbar {
  width: 8px;
  background: #444849;
}
::-webkit-scrollbar-thumb {
  background: #dad7d7;
}
</style>
