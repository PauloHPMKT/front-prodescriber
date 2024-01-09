<script setup lang="ts"></script>

<template>
  <section class="base_structure">
    <slot></slot>
  </section>
</template>

<style scoped lang="scss">
.base_structure {
  min-height: 40vh;
  margin: 100px 0;
  padding: 0 10%;
}
</style>
