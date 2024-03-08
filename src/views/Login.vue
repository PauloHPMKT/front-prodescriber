<script setup lang="ts">
import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import Default from "../templates/default.vue";
import BackTo from "../components/Icons/BackTo.vue";
import FormLogin from "../components/Forms/FormLogin.vue";
import InputField from "../components/Inputs/InputField.vue";
import GeneralButton from "../components/Button/GeneralButton.vue";

import { useValidation } from "../composables/useValidation";
import { Account } from "../types/account";
import logo from "../assets/img/logo_prodescriber.png";

import { useAuthStore } from "../store/index";
import { useToastStore } from "../store/toast";

const authStore = useAuthStore();
const toastStore = useToastStore();
const router = useRouter();
const { formsValidation } = useValidation();

const isTextVisible = ref(false);
const loginData = ref<Account.Login>({
  email: "",
  password: "",
});

const showText = () => {
  isTextVisible.value = true;
};

const hideText = () => {
  isTextVisible.value = false;
};

const toHomePage = () => router.push({ name: "home" });

const submitLogin = async () => {
  const request = loginData.value;
  const isEmptyFields = formsValidation(request);

  if (isEmptyFields !== true) {
    toastStore.execute(String(isEmptyFields), false);
    return;
  }

  try {
    const authLogin = await authStore.login(request);
    const { data, status } = authLogin;
    if (status === 200) {
      const access_token = data.access_token;
      localStorage.setItem("access_token", access_token);
      const user = data.user;
      authStore.getCurrentUser(user);

      const description = localStorage.getItem("result");
      return description
        ? router.push({
            name: "dashboard",
            query: { description },
          })
        : router.push({ name: "dashboard" });
    }
  } catch (error) {
    toastStore.execute("Erro ao realizar o login!", false);
  }
};
</script>

<template>
  <div class="h-screen relative flex flex-col justify-center items-center">
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
          <RouterLink :to="{ name: 'register' }" class="text-blue-600 underline"
            >Registrar</RouterLink
          >
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
</template>

<style scoped lang="scss"></style>
