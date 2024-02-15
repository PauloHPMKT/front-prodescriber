<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Default from "../templates/default.vue";
import DefaultIcon from "../components/Icons/defaultIcon.vue";
import FormLogin from "../components/Forms/FormLogin.vue";

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

const showText = () => {
  isTextVisible.value = true;
};

const hideText = () => {
  isTextVisible.value = false;
};

const toHomePage = () => router.push({ name: "home" });

const submitLogin = async (request: Account.Login) => {
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
  <default class="container_login">
    <div
      class="slug"
      @click="toHomePage"
      @mouseover="showText"
      @mouseleave="hideText"
    >
      <default-icon :name="'tabler:arrow-left'" class="icon_container" />
      <p :class="{ hidden_text: isTextVisible }">voltar para a home</p>
    </div>
    <div class="banner_bg"></div>
    <div class="login_area shadow-lg">
      <figure>
        <img :src="logo" alt="Logo ProDescriber" />
        <figcaption>
          <h3>Área de Login</h3>
        </figcaption>
      </figure>
      <form-login @handle-login="submitLogin" />
    </div>
  </default>
</template>

<style scoped lang="scss">
.banner_bg {
  width: 50%;
  height: 70%;
  background-image: url("../assets/img/dashed_bg.svg");
  background-size: 100px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%);
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(125deg)
    brightness(1000%);
  z-index: -1;
}
.container_login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 71vh;

  .slug {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    border: 1px solid #c5c5c51c;
    background-image: linear-gradient(45deg, #202020, #292727);
    transition: all 0.3s ease-out;
    border-radius: 20px;
    padding: 10px;
    color: #fff;
    cursor: pointer;
    overflow: hidden;
    transition: width 0.3s ease;
    height: 45px;
    width: 45px;

    &:hover {
      width: 200px;
    }

    .icon_container {
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      margin-right: 10px;
    }

    p {
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease;
      position: absolute;
      top: 20%;
      right: -100%;
      color: #0d0d0d;
    }
    .hidden_text {
      opacity: 1;
      visibility: visible;
      transition: opacity 0.3s ease;
      right: 10%;
      color: #fff;
    }
  }
  .login_area {
    background-image: linear-gradient(45deg, #323232, #4d4b4b);
    width: 40%;
    padding: 50px;
    border-radius: 6px;

    img {
      width: 250px;
      margin-left: -10px;
    }

    figcaption {
      margin-bottom: 30px;
    }
  }
}
</style>
