<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import DefaultIcon from "../Icons/defaultIcon.vue";

import { useRouter } from "vue-router";
import { useClipboard } from "../../composables/useClipboard";
//store
import { useOpenAIStore } from "../../store/openai";
import { useToastStore } from "../../store/toast";
//executes
const router = useRouter();
const { copyToClipboard } = useClipboard();
const { execute } = useToastStore();
const { descriptionContent } = useOpenAIStore();

const presentationMessage = ref("");
const typewriterText = ref("");

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

const typeWriter = (text: string, index: string | number) => {
  if (typeof index === "number" && index < text.length) {
    typewriterText.value += text.charAt(index);
    setTimeout(() => {
      typeWriter(text, index + 1);
    }, 30);
  }
};

const handleCopyToClipboard = async (result: string) => {
  copyToClipboard(result);
  execute("Descrição copiada com sucesso!", true);
};

onMounted(() => {
  if (router.currentRoute.value.name === "dashboard") {
    return typeWriter(descriptionContent.result, 0);
  }
});
</script>

<template>
  <article class="description">
    <default-icon
      :name="'tabler:copy'"
      :title="'Copiar descrição'"
      class="clipboard"
      @click="handleCopyToClipboard(descriptionContent.result)"
    />
    <p class="item" v-html="productTitle"></p>
    <p style="user-select: none" class="description-content">
      {{ typewriterText || descriptionContent.result }}
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
