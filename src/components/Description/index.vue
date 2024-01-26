<script setup lang="ts">
import { computed, ref } from "vue";
import DefaultIcon from "../Icons/defaultIcon.vue";
import StatusPopup from "../Popup/Status.vue";

import { useRouter } from "vue-router";
import { useClipboard } from "../../composables/useClipboard";
import { useOpenAIStore } from "../../store/openai";

const router = useRouter();
const { copyToClipboard } = useClipboard();
const { descriptionContent } = useOpenAIStore();

const toast = ref<InstanceType<typeof StatusPopup> | null>(null);
const toastMessage = ref("");
const presentationMessage = ref("");

const productTitle = computed((): string => {
  const homeText = `O que acha dessa descrição para o item:
    <strong style="font-weight: bold;">${descriptionContent.item}</strong>.`;
  const dashboardText = `Que ótimo que gostou da descrição para o item:
    <strong style="font-weight: bold;">${descriptionContent.item}</strong>.
    Clique em salvar para adicionar a sua lista.
  `;

  return router.currentRoute.value.name === "home"
    ? (presentationMessage.value = homeText)
    : (presentationMessage.value = dashboardText);
});

const handleCopyToClipboard = async (result: string) => {
  copyToClipboard(result);
  toastMessage.value = "Descrição copiada com sucesso!";
  toast.value?.success(toastMessage.value);
};
</script>

<template>
  <article class="description">
    <status-popup :status_message="toastMessage" ref="toast" />
    <default-icon
      :name="'tabler:copy'"
      :title="'Copiar descrição'"
      class="clipboard"
      @click="handleCopyToClipboard(descriptionContent.result)"
    />
    <p class="item" v-html="productTitle"></p>
    <p style="user-select: none" class="description-content">
      {{ descriptionContent.result }}
    </p>
    <footer class="card-description-footer">
      <slot></slot>
    </footer>
  </article>
</template>

<style scoped lang="scss">
.description {
  margin: 30px;
  padding: 30px;
  border-radius: 8px;
  background: #fff;
  position: relative;

  .clipboard {
    border-radius: 6px;
    width: 36px;
    height: 36px;
    padding: 5px;
    color: #121212;
    font-size: 1.5rem;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: #121212;
      color: #fff;
    }
  }

  .item,
  .description-content {
    color: #121212;
    margin-bottom: 20px;
  }

  .card-description-footer {
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }
}
</style>
