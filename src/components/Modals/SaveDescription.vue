<script setup lang="ts">
import { onMounted } from "vue";
import Description from "../Description/index.vue";
import overlay from "../../templates/overlay.vue";
import MainButton from "../Button/index.vue";
import { DescriptionProps } from "../../types/interfaces";
import openAIService from "../../services/openai.service";

import { useHelpers } from "../../composables/useHelpers";
import { AxiosResponse } from "axios";

const { removeMultipleKeysStoraged } = useHelpers();

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

const save = () => {
  const save = {
    prompt: localStorage.getItem("prompt"),
    content: props.result,
  };
  openAIService.saveDescription(save).then((res: AxiosResponse<any, any>) => {
    console.log(res.data);
    removeMultipleKeysStoraged(["item", "prompt"]);
  });
};

onMounted(() => {});
</script>

<template>
  <overlay>
    <description
      :item="props.item"
      :result="props.result"
      class="container_modal"
    >
      <div class="button_container">
        <main-button @click="save">Sim</main-button>
        <main-button @click="leaveDescription">Cancelar</main-button>
      </div>
    </description>
  </overlay>
</template>

<style scoped lang="scss">
.container_modal {
  position: relative;
  padding: 50px;
  background-color: #fff;
  border-radius: 6px;
  width: 700px;
  max-height: 80%;
  overflow: auto;

  .button_container {
    display: flex;
    justify-content: flex-end;
    gap: 6px;
  }

  .item,
  .description_content {
    color: #121212;
    margin-bottom: 20px;
  }
}
</style>
