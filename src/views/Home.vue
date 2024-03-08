<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
//components
import MainHeader from "../components/Header/index.vue";
import MainButton from "../components/Button/index.vue";
import FormDescription from "../components/Forms/FormDescription.vue";
import LoadSpinner from "../components/Loaders/LoadSpinner.vue";
import BreadcrumbButtons from "../components/BreadcrumbButtons/index.vue";
import Default from "../templates/default.vue";
import Description from "../components/Description/index.vue";
import About from "../components/site/About.vue";
//externals
import { Breadcrumb } from "../types/interfaces";
import { useValidation } from "../composables/useValidation";
import { useOpenai } from "../composables/useOpenai";
import { useOnMounted } from "../composables/useOnMounted";
//store
import { useAuthStore } from "../store";
import { useOpenAIStore } from "../store/openai";
import { useToastStore } from "../store/toast";
//executes
const router = useRouter();
const authStore = useAuthStore();
const { execute } = useToastStore();
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
const breadcrumbButtons = ref([
  {
    label: "Gostei",
    action: "like",
    icon: "like-light",
  },
  {
    label: "Não gostei",
    action: "dislike",
    icon: "player-next-light",
  },
  {
    label: "Gerar outra descrição",
    action: "generate",
    icon: "restart",
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

const registration = () => {
  if (localStorage.getItem("access_token")) {
    router.push({ name: "dashboard" });
    return;
  }
  return router.push({ name: "register" });
};

const saveDescription = (token: string | null) => {
  !!token ? router.push({ name: "dashboard" }) : router.push({ name: "login" });
};

const submitDescription = async (description: string) => {
  const isEmptyField = required(description);
  const descriptionLength = minLength(description);

  if (description === "") {
    message.value = String(isEmptyField);
    execute(message.value, false);
    return;
  }

  if (description.length < 3) {
    message.value = String(descriptionLength);
    execute(message.value, false);
    return;
  }

  loading.value = true;
  showDemo.value = false;

  const prompt = `Gere uma descrição resumida e eficiente, SEO-friendly para o produto: ${description}.`;
  const gptRole = authStore.currentUser.role_system || "user";
  const request = chatRequest(gptRole, prompt);

  try {
    const { data, status } = await createOpenaiDescription(request);
    if (status === 201) {
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
      execute(message.value, false);
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
    <MainHeader />
    <div class="m-auto w-[1500px]">
      <div class="banner_bg"></div>
      <main>
        <default>
          <div class="content">
            <h1 class="text-2xl">
              <span class="text-slate-300 font-medium">ProDescriber</span>, seu
              parceiro confiável para criação de descrições de produtos!
            </h1>
            <p>
              Crei descrições de alta qualidade e totalmente SEO-friendly para
              seu produto e impulsione suas vendas. Experimente já o
              ProDescriber!
            </p>
            <div class="mt-8">
              <main-button @click="registration" class="bg-button text-white">
                Comece agora Gratuitamente
                <Icon :icon="'tabler:wand'" />
              </main-button>
            </div>
            <!-- <div id="demo" v-if="showDemo">
              <transition name="slide-fade">
                <main-button
                  v-if="show === false"
                  @click="show = !show"
                  class="bg-button text-white"
                >
                  Comece agora Gratuitamente
                  <Icon :icon="'tabler:wand'" />
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
              <description v-else>
                <breadcrumb-buttons
                  :buttons="breadcrumbButtons"
                  @actions="triggerActions"
                />
              </description>
            </div> -->
          </div>
        </default>
        <default>
          <About />
        </default>
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home_view {
  background-image: linear-gradient(90deg, #121212, #000, #121212);
  padding-top: 30px;
  position: absolute;
  width: 100%;

  .banner_bg {
    width: 50%;
    height: 80%;
    background-image: url("../assets/img/dashed_bg.svg");
    background-size: 100px;
    position: absolute;
    top: -15%;
    left: 49.7%;
    transform: translate(-50%);
    filter: invert(100%) sepia(90%) saturate(0%) hue-rotate(125deg)
      brightness(1000%);
  }
  .content {
    width: 80%;
    margin: 0 auto;
    padding: 40px 0;
    text-align: center;

    h1 {
      font-size: 2.8rem;
      font-weight: 600;
      line-height: 1.2;
      margin-bottom: 35px;
      text-shadow: 0 0 1px #fff;
    }

    p {
      line-height: 1.5;
      font-size: 1.1rem;
      color: #a3a3a3;
      padding: 0 80px 40px;
    }

    .bg-button {
      position: absolute;
      transform: translate(-50%);
      padding-top: 7px;
      padding-bottom: 7px;
      border: 1px solid #c5c5c51c;
      background-image: linear-gradient(45deg, #202020, #292727);
      transition: all 0.3s ease-out;

      &:hover {
        filter: drop-shadow(0 0 0.4rem #028a616e);
        cursor: pointer;
      }

      svg {
        margin-left: 10px;
        font-size: 1.2rem;
      }
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

    .loader_container {
      margin: 30px auto;
      padding: 30px;
      width: 600px;
      border-radius: 8px;
    }
  }
}
</style>
