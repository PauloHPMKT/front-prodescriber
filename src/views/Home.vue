<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
//components
import MainHeader from "../components/Header/index.vue";
import MainButton from "../components/Button/index.vue";
import BreadcrumbButtons from "../components/BreadcrumbButtons/index.vue";
import Default from "../templates/default.vue";
import Hero from "@/components/site/Hero.vue";
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
          <Hero />
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
    z-index: 10;
    transform: translate(-50%);
    filter: invert(100%) sepia(90%) saturate(0%) hue-rotate(125deg)
      brightness(1000%);
  }
}
</style>
