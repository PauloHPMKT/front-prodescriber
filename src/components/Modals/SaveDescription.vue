<script setup lang="ts">
import { onMounted, defineExpose, ref } from "vue";
import Description from "../Description/index.vue";
import overlay from "../../templates/overlay.vue";
import MainButton from "../Button/index.vue";
import StatusPopup from "../Popup/Status.vue";

import { DescriptionProps } from "../../types/interfaces";
import openAIService from "../../services/openai.service";
import { useHelpers } from "../../composables/useHelpers";

import { useOpenAIStore } from "../../store/openai";
import { useRouter } from "vue-router";

const router = useRouter();
const { descriptionContent, cleanStore } = useOpenAIStore();
const { removeMultipleKeysStoraged } = useHelpers();

const toast = ref<InstanceType<typeof StatusPopup> | null>(null);
const toastMessage = ref("");
const isDisabled = ref(false);
const hideDescriptionModal = ref(false);

const props = defineProps<DescriptionProps>();
const emit = defineEmits(["hideDescriptionModal"]);

const leaveDescription = () => {
  hideDescriptionModal.value = true;
  router.push({ name: "dashboard", query: {} });
  cleanStore();
};

defineExpose({
  leaveDescription,
});

const save = () => {
  const save = {
    prompt: descriptionContent.prompt,
    content: props.result,
  };
  openAIService.saveDescription(save).then(() => {
    removeMultipleKeysStoraged(["item", "prompt"]);
    toastMessage.value = "Descrição salva com sucesso!";
    toast.value?.success(toastMessage.value);
    isDisabled.value = true;
    setTimeout(() => {
      emit("hideDescriptionModal");
    }, 2000);
  });
};

onMounted(() => {});
</script>

<template>
  <overlay>
    <status-popup :status_message="toastMessage" ref="toast" />
    <description class="container_modal">
      <div class="button_container" :class="{ disabled: isDisabled }">
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
