<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import MainHeader from "../components/Header/index.vue";
import MainButton from "../components/Button/index.vue";
import FormDescription from "../components/Forms/FormDescription.vue";
import LoadSpinner from "../components/Loaders/LoadSpinner.vue";
import BreadcrumbButtons from "../components/BreadcrumbButtons/index.vue";
import Default from "../templates/default.vue";
import StatusPopup from "../components/Popup/Status.vue";
import Description from "../components/Description/index.vue";

import { Breadcrumb } from "../types/interfaces";
import { useValidation } from "../composables/useValidation";
import { useOpenai } from "../composables/useOpenai";
import { useOnMounted } from "../composables/useOnMounted";

import { useAuthStore } from "../store";
import { useOpenAIStore } from "../store/openai";

const router = useRouter();
const authStore = useAuthStore();
const {
  createOpenaiDescription,
  storeDescriptionContent,
  cleanStore,
  descriptionContent,
} = useOpenAIStore();
const { chatRequest } = useOpenai();
const { minLength, required } = useValidation();
const { removeStoreOnLoad } = useOnMounted();

const showDemo = ref(true);
const show = ref(false);
const loading = ref(false);
const product = ref("");
const result = ref("");
const message = ref("");
const toast = ref<InstanceType<typeof StatusPopup> | null>(null);
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
] as Breadcrumb.Buttons[]);

const triggerActions = (actions: string) => {
  switch (actions) {
    case Breadcrumb.Actions.LIKE:
      const isLogged = localStorage.getItem("access_token");
      saveDescription(isLogged);
      break;
    case Breadcrumb.Actions.DISLIKE:
      const description = descriptionContent.item;
      submitDescription(description);
      break;
    case Breadcrumb.Actions.GENERATE:
      showDemo.value = !showDemo.value;
      cleanStore();
      break;
    default:
      break;
  }
};

const saveDescription = (token: string | null) => {
  if (!!token) {
    router.push({ name: "dashboard", query: { description: result.value } });
  } else {
    router.push({ name: "login" });
  }
};

const submitDescription = async (description: string) => {
  const descriptionLength = minLength(description);
  const isEmptyField = required(description);

  if (description === "") {
    message.value = String(isEmptyField);
    toast.value?.error(message.value);
    return;
  }

  if (description.length < 3) {
    message.value = String(descriptionLength);
    toast.value?.error(message.value);
    return;
  }

  loading.value = true;
  showDemo.value = false;

  const prompt = `Gere uma descrição resumida e eficiente, SEO-friendly para o produto: ${description}.`;
  const gptRole = authStore.currentUser.role_gpt_generate || "user";
  const request = chatRequest(gptRole, prompt);

  try {
    const generate = await createOpenaiDescription(request);
    const { data, status } = generate;
    if (status === 200) {
      result.value = data.result.message.content;
      product.value = description;
      const storeContent = {
        item: product.value,
        prompt,
        result: result.value,
      };
      storeDescriptionContent(storeContent);
    }
  } catch (error: Error) {
    if (error) {
      message.value = "Erro ao gerar descrição!";
      toast.value?.error(message.value);
      loading.value = false;
      showDemo.value = true;
    }
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  removeStoreOnLoad(cleanStore());
});
</script>

<template>
  <div class="home_view">
    <status-popup :status_message="message" ref="toast" />
    <main-header />
    <main>
      <default>
        <div class="banner_bg"></div>
        <div class="content">
          <h1>
            ProDescriber é o seu parceiro confiável para criação de descrições
            de produtos!
          </h1>
          <p>
            Crei descrições de alta qualidade e totalmente SEO-friendly para seu
            produto e impulsione suas vendas. Experimente já o ProDescriber, o
            melhor amigo do seu negócio!
          </p>
          <div id="demo" v-if="showDemo">
            <transition name="slide-fade">
              <main-button v-if="show === false" @click="show = !show">
                Gerar Descrição
              </main-button>
              <form-description v-else @submit="submitDescription" />
            </transition>
          </div>
          <div v-else>
            <div v-if="loading" style="text-align: center">
              <div class="loader_container">
                <load-spinner
                  :loader_description="'Aguarde enquanto geramos a sua descrição perfeita!'"
                />
              </div>
            </div>
            <description v-else :item="product" :result="result">
              <breadcrumb-buttons
                :buttons="breadcrumbButtons"
                @actions="triggerActions"
              />
            </description>
          </div>
        </div>
      </default>
      <default style="background-color: #121212">
        <h1>Pagina de Informações</h1>
      </default>
    </main>
  </div>
</template>

<style scoped lang="scss">
.home_view {
  margin: 0 auto;
  position: relative;
  .banner_bg {
    width: 100%;
    height: 100%;
    background-image: url("../assets/img/dashed_bg.svg");
    background-size: 100px;
    position: absolute;
    top: 0;
    left: 0;
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(125deg)
      brightness(1000%);
    z-index: -1;
  }
  .content {
    width: 80%;
    margin: 0 auto;
    padding: 30px 0;
    text-align: center;

    h1 {
      font-size: 2.8rem;
      font-weight: 600;
      line-height: 1.2;
      margin-bottom: 35px;
    }

    p {
      line-height: 1.5;
      font-size: 1.25rem;
      color: #a3a3a3;
      padding: 0 50px 40px;
    }

    #demo {
      position: relative;
      //margin: 8% 0 0;

      button {
        position: absolute;
        transform: translate(-50%);
      }

      .slide-fade-enter-active {
        transition: all 0.4s ease-out;
      }

      .slide-fade-leave-active {
        transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
      }

      .slide-fade-enter-from,
      .slide-fade-leave-to {
        transform: translateX(20px);
        opacity: 0;
      }
    }

    .loader_container {
      margin: 30px auto;
      padding: 30px;
      width: 600px;
      border-radius: 8px;
    }
  }
}
</style>
