<script setup lang="ts">
import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import BackTo from "../components/Icons/BackTo.vue";
import InputField from "../components/Inputs/InputField.vue";
import GeneralButton from "../components/Button/GeneralButton.vue";
import PageTransition from "../components/PageTransition/index.vue";

import { useValidation } from "../composables/useValidation";
import { useToast } from "../composables/useToast";
import { Account } from "../types/account";
import logo from "../assets/img/logo_prodescriber.png";

import { useAuthStore } from "../store/index";

const router = useRouter();
const authStore = useAuthStore();
const { formsValidation } = useValidation();
const { showToast } = useToast();


const loginData = ref<Account.Login>({
  email: "",
  password: "",
});
const isLoading = ref(false);

const toHomePage = () => router.push({ name: "home" });

const submitLogin = async () => {
  const request = loginData.value;
  const isEmptyFields = formsValidation(request);
  const TIME_TO_REDIRECT = 3000;

  if (isEmptyFields !== true) {
    showToast("error", String(isEmptyFields));
    return;
  }
  
  try {
    isLoading.value = true;
    const authLogin = await authStore.login(request);
    const { data, status } = authLogin;
    if (status === 200) {
      const user = data.user;
      authStore.getCurrentUser(user);
      setTimeout(() => {
        isLoading.value = false;
        const access_token = data.access_token;
        localStorage.setItem("access_token", access_token);
  
        router.push({ name: "dashboard" })
      }, TIME_TO_REDIRECT)
    }
  } catch (error) {
    isLoading.value = false;
    showToast("error", "Erro ao realizar o login!");
  }
};
</script>

<template>
  <transition name="fade">
    <PageTransition v-if="isLoading" :username="authStore.currentUser.username!" ref="loader" />
    <div v-else class="h-screen relative flex flex-col justify-center items-center">
      <BackTo message="Voltar para a Home" @navigateAction="toHomePage" />
      <form
        @submit.prevent="submitLogin"
        class="w-[400px] flex flex-col gap-4 justify-center items-center"
      >
        <figure>
          <img
            :src="logo"
            alt="Logo ProDescriber"
            class="filter invert w-[250px] -mx-2"
          />
          <figcaption>
            <h3 class="text-gray-950 font-semibold">Área de Login</h3>
          </figcaption>
          <div class="flex items-center">
            <p class="my-6 mr-1">Ainda não criou sua Workspace?</p>
            <RouterLink :to="{ name: 'register' }" class="text-blue-600 underline">
              Registrar
            </RouterLink>
          </div>
        </figure>
        <div class="flex flex-col gap-5 w-full">
          <InputField placeholder="E-mail de Usuário" v-model="loginData.email" />
          <InputField
            placeholder="Sua Senha"
            :isPassword="true"
            v-model="loginData.password"
          />
          <GeneralButton class="w-full h-14"> Entrar </GeneralButton>
        </div>
      </form>
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
</style>
