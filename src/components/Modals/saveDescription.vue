<script setup lang="ts">
import { DescriptionProps } from "../../types/interfaces";

const props = defineProps<DescriptionProps>();
</script>

<template>
  <div class="overlay">
    <div class="container_modal">
      <p>{{ props.description }}</p>
      <div>
        <button>Sim</button>
        <button>Cancelar</button>
      </div>
    </div>
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

  .container_modal {
    padding: 30px;
    background-color: #fff;
    border-radius: 6px;
    max-width: 80%;
    max-height: 80%;
    overflow: auto;
  }
}
</style>
