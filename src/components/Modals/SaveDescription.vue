<script setup lang="ts">
import { defineExpose, ref } from "vue";
import { useRouter } from "vue-router";
import Description from "../Description/index.vue";
import overlay from "../../templates/overlay.vue";
import MainButton from "../Button/index.vue";
import StatusPopup from "../Popup/Status.vue";

import { useOpenAIStore } from "../../store/openai";

const router = useRouter();
const { descriptionContent, saveDescription, cleanStore } = useOpenAIStore();

const isModalVisible = ref(false);

const toast = ref<InstanceType<typeof StatusPopup> | null>(null);
const toastMessage = ref("");
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
      toastMessage.value = "Descrição salva com sucesso!";
      toast.value?.success(toastMessage.value);
      isDisabled.value = true;
      setTimeout(() => {
        hideModal();
      }, 2000);
    }
  } catch (error) {
    toastMessage.value = "Erro ao salvar descrição!";
    toast.value?.error(toastMessage.value);
  }
};

const hideModal = () => {
  isModalVisible.value = false;
  router.push({ name: "dashboard", query: {} });
  cleanStore();
};

const showModal = () => {
  isModalVisible.value = true;
};

defineExpose({
  showModal,
});
</script>

<template>
  <overlay v-if="isModalVisible">
    <status-popup :status_message="toastMessage" ref="toast" />
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
