<script setup lang="ts">
import { defineExpose, ref } from "vue";
import Description from "../Description/index.vue";
import overlay from "../../templates/overlay.vue";
import MainButton from "../Button/index.vue";

import { useOpenAIStore } from "../../store/openai";
import { useToastStore } from "../../store/toast";

const { descriptionContent, saveDescription, cleanStore } = useOpenAIStore();
const { execute } = useToastStore();

const isModalVisible = ref(false);
const isDisabled = ref(false);

const save = async () => {
  try {
    const saveContent = {
      prompt: descriptionContent.prompt,
      content: descriptionContent.result,
    };

    const { status } = await saveDescription(saveContent);
    if (status === 201) {
      cleanStore();
      execute("Descrição salva com sucesso!", true);
      isDisabled.value = true;
      setTimeout(() => {
        hideModal();
      }, 2000);
    }
  } catch (error) {
    execute("Erro ao salvar descrição!", false);
  }
};

const hideModal = () => {
  isModalVisible.value = false;
  if (descriptionContent.result) return cleanStore();
};

const showModal = () => {
  isModalVisible.value = true;
};

defineExpose({
  showModal,
  hideModal,
});
</script>

<template>
  <overlay v-if="isModalVisible">
    <description class="container_modal">
      <div class="button_container" :class="{ disabled: isDisabled }">
        <main-button @click="save">Sim</main-button>
        <main-button @click="hideModal">Cancelar</main-button>
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
  .disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  .item,
  .description_content {
    color: #121212;
    margin-bottom: 20px;
  }
}
</style>
