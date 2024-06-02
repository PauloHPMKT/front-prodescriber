<script setup lang="ts">
import { onMounted, computed } from "vue";
import MainHeader from "../components/Header/index.vue";
import Container from "../templates/container.vue";
import Default from "../templates/default.vue";
import Hero from "../components/site/Hero.vue";
import About from "../components/site/About.vue";
import PageTransition from "../components/PageTransition/index.vue";
import { useOnMounted } from "../composables/useOnMounted";
import { useAuthStore } from "../store";
import { useOpenAIStore } from "../store/openai";
const authStore = useAuthStore();
const { cleanStore } = useOpenAIStore();
const { removeStoreOnLoad } = useOnMounted();

// const breadcrumbButtons = ref([
//   {
//     label: "Gostei",
//     action: "like",
//     icon: "like-light",
//   },
//   {
//     label: "Não gostei",
//     action: "dislike",
//     icon: "player-next-light",
//   },
//   {
//     label: "Gerar outra descrição",
//     action: "generate",
//     icon: "restart",
//   },
// ] as Breadcrumb.Buttons[]);

const isStoragedUser = computed(() => {
  const userStoraged = localStorage.getItem("access_token");
  return !!userStoraged
    ? authStore.$state.currentUser.username
    : "Carregando workspace...";

})

// const triggerActions = (actions: string) => {
//   switch (actions) {
//     case Breadcrumb.Actions.LIKE:
//       const isLogged = localStorage.getItem("access_token");
//       saveDescription(isLogged);
//       break;
//     case Breadcrumb.Actions.DISLIKE:
//       const description = descriptionContent.item;
//       submitDescription(description);
//       break;
//     case Breadcrumb.Actions.GENERATE:
//       showDemo.value = !showDemo.value;
//       cleanStore();
//       break;
//     default:
//       break;
//   }
// };

// const saveDescription = (token: string | null) => {
//   !!token ? router.push({ name: "dashboard" }) : router.push({ name: "login" });
// };

// const submitDescription = async (description: string) => {
//   const isEmptyField = required(description);
//   const descriptionLength = minLength(description);

//   if (description === "") {
//     message.value = String(isEmptyField);
//     execute(message.value, false);
//     return;
//   }

//   if (description.length < 3) {
//     message.value = String(descriptionLength);
//     execute(message.value, false);
//     return;
//   }

//   loading.value = true;
//   showDemo.value = false;

//   const prompt = `Gere uma descrição resumida e eficiente, SEO-friendly para o produto: ${description}.`;
//   const gptRole = authStore.currentUser.role_system || "user";
//   const request = chatRequest(gptRole, prompt);

//   try {
//     const { data, status } = await createOpenaiDescription(request);
//     if (status === 201) {
//       result.value = data.result.message.content;
//       product.value = description;
//       const storeContent = {
//         item: product.value,
//         prompt,
//         result: result.value,
//       };
//       storeDescriptionContent(storeContent);
//     }
//   } catch (error: Error) {
//     if (error) {
//       message.value = "Erro ao gerar descrição!";
//       execute(message.value, false);
//       loading.value = false;
//       showDemo.value = true;
//     }
//   } finally {
//     loading.value = false;
//   }
// };

onMounted(() => {
  removeStoreOnLoad(cleanStore());
  authStore.$state.pageTransition = false;
});
</script>

<template>
  <transition name="fade">
    <PageTransition 
      v-if="authStore.$state.pageTransition" 
      :username="isStoragedUser!" 
    />
    <div v-else class="home_view">
      <MainHeader />
      <Container>
        <div class="banner_bg"></div>
        <main>
          <default>
            <Hero />
          </default>
          <default>
            <About />
          </default>
        </main>
      </Container>
    </div>
  </transition> 
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.home_view {
  padding-top: 30px;
  position: absolute;
  width: 100%;

  .banner_bg {
    width: 50%;
    height: 80%;
    background-image: url("../assets/img/dashed_bg.svg");
    background-size: 100px;
    position: absolute;
    top: -50%;
    left: 20%;
    z-index: 10;
    transform: translate(-50%);
  }
}
</style>
