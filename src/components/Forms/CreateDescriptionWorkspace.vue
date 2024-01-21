<script setup lang="ts">
import { ref } from "vue";
import FormDescription from "./FormDescription.vue";
import overlay from "../../templates/overlay.vue";

const isOpen = ref(false);

const emit = defineEmits(["submit"]);

const submitDescription = () => {
  console.log("clicou");
};

const openModal = () => {
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};

defineExpose({
  openModal,
  closeModal,
});
</script>

<template>
  <overlay v-if="isOpen">
    <div class="container_form">
      <form-description @submit="submitDescription" />
      <div>Aqui ficará a descrição</div>
    </div>
  </overlay>
</template>

<style scoped lang="scss">
.container_form {
  background-color: #fff;
  height: 500px;
  position: absolute;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.158);
  padding: 30px;
  border-radius: 6px;
}
</style>
