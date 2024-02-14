<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import MainButton from "../../components/Button/index.vue";
import BaseInput from "../../components/Inputs/BaseInput.vue";
import Description from "../../components/Description/index.vue";
import BreadcrumbButtons from "../../components/BreadcrumbButtons/index.vue";
import loadingBot from "../../assets/lottie_animations/loadingBot.json";
import { useOpenAIStore } from "../../store/openai";
import { useAuthStore } from "../../store";
import { useOpenai } from "../../composables/useOpenai";
import { useToastStore } from "../../store/toast";
import Popover from "../../components/Popup/Popover.vue";
import SaveDescription from "../../components/Modals/SaveDescription.vue";

const { currentUser } = useAuthStore();
const { chatRequest } = useOpenai();
const { execute } = useToastStore();
const { createOpenaiDescription, storeDescriptionContent } = useOpenAIStore();

const dataToGenerate = ref({
  product_name: "",
  product_description: "",
  product_category: "",
  target_audience: "",
  place: "",
});
const result = ref("");
const product = ref("");
const message = ref("");
const loading = ref(false);
const isJumping = ref(false);
const breadcrumbButtons = ref([
  {
    label: "Gostei",
    action: "like",
  },
  {
    label: "Não gostei",
    action: "dislike",
  },
  {
    label: "Gerar outra descrição",
    action: "generate",
  },
]);
const pageGuide = ref(`
  O recurso de Gerador de descrição conta com preenchimento
  dos campos com as informações do seu produto e dados que metrifiquem
  seu publico alvo como forma de direcionar a criação de uma descrição
  mais acertiva e eficiente de forma a impulsionar suas vendas e para criar
  descrições de alta qualidade.
`);

const triggerActions = (actions: string) => {
  switch (actions) {
    case "like":
      save();
      break;
    case "dislike":
      console.log("dislike");
      break;
    case "generate":
      console.log("generate");
      break;
    default:
      break;
  }
};

const createDescription = async () => {
  const prompt = `
  Crie uma descrição totalmente SEO friendly
  para o produto ${dataToGenerate.value.product_name},
  considerando a descrição: ${dataToGenerate.value.product_description},
  na categoria: ${dataToGenerate.value.product_category},
  visando atender as necessidades do publico ${dataToGenerate.value.target_audience},
  da região de ${dataToGenerate.value.place}.
  `;
  console.log(prompt);
  const gptRole = currentUser.role_system || "user";
  const request = chatRequest(gptRole, prompt);

  loading.value = true;

  try {
    const { data, status } = await createOpenaiDescription(request);
    if (status === 201) {
      console.log(data);
      result.value = data.result.message.content;
      product.value = prompt;
      const storeContent = {
        item: dataToGenerate.value.product_name,
        prompt,
        result: result.value,
      };
      storeDescriptionContent(storeContent);
    }
  } catch (error) {
    if (error) {
      message.value = "Erro ao gerar descrição!";
      execute(message.value, false);
      loading.value = false;
    }
  } finally {
    loading.value = false;
  }
};

const save = () => {
  console.log("salvar");
};
</script>

<template>
  <div class="flex bg-white border-2 rounded-xl h-full overflow-hidden">
    <div class="flex w-1/2 bg-secondary-100">
      <div class="border-r-2 w-[15%] p-7">ações</div>
      <form
        id="form"
        @submit.prevent="createDescription"
        class="w-[85%] p-7 overflow-y-scroll"
      >
        <h1>Gerar Descrição</h1>
        <p>
          Preencha os campos abaixo para gerar uma descrição de alta qualidade
          para seu produto!
        </p>
        <div class="mt-10">
          <div class="mb-4">
            <base-input
              v-model="dataToGenerate.product_name"
              :label="'Nome do produto'"
              :placeholder="'iPhone 12, Smartv 4k, etc...'"
            />
          </div>
          <div class="mb-4">
            <label for="product_description">Descrição do produto</label>
            <div
              class="flex justify-between items-center bg-white h-[120px] rounded-md overflow-hidden shadow"
            >
              <textarea
                id="product_description"
                v-model="dataToGenerate.product_description"
                placeholder="Conte-nos um pouco sobre o que é seu produto ou serviço."
                class="w-full h-full border-none focus:outline-none resize-none py-1 px-3"
              ></textarea>
            </div>
          </div>
          <div class="mb-4">
            <base-input
              v-model="dataToGenerate.product_category"
              :label="'Categoria do produto'"
              :placeholder="'Eletronico, Informatica, etc...'"
            />
          </div>
          <hr />
          <h3 style="margin: 40px 0">
            Segmentação - Insira dados referente ao seu público alvo
          </h3>
          <div class="mb-4">
            <base-input
              v-model="dataToGenerate.target_audience"
              :label="'Público alvo'"
              :placeholder="'Eletronico, Informatica, etc...'"
            />
            <!-- <select type="text" id="target_audience">
                <option value="1">Homens</option>
                <option value="2">Mulheres</option>
                <option value="3">Unissex</option>
              </select> -->
          </div>
          <div class="mb-4">
            <base-input
              v-model="dataToGenerate.place"
              :label="'Local do publico alvo'"
              :placeholder="'Cidade, Estado, País, etc...'"
            />
          </div>
        </div>
        <div class="flex gap-4 mt-10">
          <main-button type="submit" class="bg-black text-white">
            Gerar descrição
            <Icon icon="tabler:wand" class="ml-3" />
          </main-button>
        </div>
      </form>
    </div>
    <div
      class="description_area relative w-1/2 bg-secondary-200 flex justify-center items-center flex-col p-10"
    >
      <div class="absolute top-4 right-0 cursor-pointer">
        <Icon
          class="w-6 h-6"
          style="color: #979797"
          icon="tabler:info-circle"
          @mouseenter="isJumping = true"
        />
        <popover
          :message="pageGuide"
          class="absolute right-0 z-10"
          :class="{ jumping: isJumping, hidden: !isJumping }"
          @click="isJumping = false"
        />
      </div>
      <div v-if="!loading && !result">
        <Vue3Lottie
          :animationData="loadingBot"
          :height="220"
          :width="220"
          :loop="false"
        />
        <h5>Olá, em que posso ajudar?</h5>
      </div>
      <div v-else>
        <div v-if="loading">
          <Vue3Lottie
            :animationData="loadingBot"
            :speed="3"
            :height="220"
            :width="220"
          />
          <h5>Que ótimo! vou gerar a melhor descrição para você!</h5>
        </div>
        <div v-else>
          <description>
            <breadcrumb-buttons
              :buttons="breadcrumbButtons"
              @actions="triggerActions"
            />
          </description>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.description_area {
  .fade-enter-active,
  .fade-leave-active {
    transition: 400ms ease all;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateX(-100px);
    max-width: 100%;
  }
}
</style>
