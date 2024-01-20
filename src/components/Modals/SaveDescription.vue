<script setup lang="ts">
import { onMounted } from "vue";
import Description from "../Description/index.vue";
import { DescriptionProps } from "../../types/interfaces";

const props = defineProps<DescriptionProps>();
const emit = defineEmits(["hideDescriptionModal"]);
// const productName = computed(() => {
//   return `Que ótimo que gostou da descrição para o item:
//     <strong style="font-weight: bold;">${props.item}</strong>.
//     Clique em salvar para adicionar a sua lista.
//   `;
// });

const leaveDescription = () => {
  emit("hideDescriptionModal");
};

onMounted(() => {
  console.log(props);
});
</script>

<template>
  <div class="overlay">
    <description
      :item="props.item"
      :result="props.result"
      class="container_modal"
    >
      <button>Sim</button>
      <button @click="leaveDescription">Cancelar</button>
    </description>
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
    position: relative;
    padding: 50px;
    background-color: #fff;
    border-radius: 6px;
    width: 700px;
    max-height: 80%;
    overflow: auto;

    .clipboard {
      position: absolute;
      top: 20px;
      right: 20px;
      border-radius: 6px;
      width: 36px;
      height: 36px;
      padding: 5px;
      color: #121212;
      font-size: 1.5rem;
      cursor: pointer;
      transition: all 0.3s ease-in-out;

      &:hover {
        background-color: #121212;
        color: #fff;
      }
    }

    .item,
    .description_content {
      color: #121212;
      margin-bottom: 20px;
    }
  }
}
</style>
