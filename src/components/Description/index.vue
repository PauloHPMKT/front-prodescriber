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

const processTypeWriter = () => {
  const routesToExecute = ["description", "home"];
  router.options.routes.forEach((route) => {
    if (routesToExecute.includes(route.name as string)) {
      return typeWriter(descriptionContent.result, 0);
    }
  });
};

onMounted(() => {
  processTypeWriter();
});
</script>

<template>
  <div class="description bg-gray-1000 shadow-lg">
    <default-icon
      :name="'tabler:copy'"
      :title="'Copiar descrição'"
      class="clipboard text-stone-600"
      @click="handleCopyToClipboard(descriptionContent.result)"
    />
    <header class="border-b border-gray-1050">
      <p class="item text-white" v-html="productTitle"></p>
    </header>
    <article class="mt-7">
      <p style="user-select: none" class="description-content text-white">
        {{ typewriterText || descriptionContent.result }}
      </p>
    </article>
    <footer class="card-description-footer">
      <slot></slot>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.description {
  margin: 30px;
  padding: 30px;
  border-radius: 8px;
  border: 1px solid #6767671a;
  position: relative;
  max-height: 80%;
  color: #fff;

  .clipboard {
    border-radius: 6px;
    width: 36px;
    height: 36px;
    padding: 5px;
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
    margin-bottom: 30px;
    max-height: 200px;
    overflow: auto;
  }

  .card-description-footer {
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }
}
</style>
