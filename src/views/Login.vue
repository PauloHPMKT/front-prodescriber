<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import Default from "../templates/default.vue";
import MainButton from "../components/Button/index.vue";
import logo from "../assets/img/logo_prodescriber.png";
import { useRouter } from "vue-router";

const router = useRouter();
const isTextVisible = ref(false);

const showText = () => {
  isTextVisible.value = true;
};

const hideText = () => {
  isTextVisible.value = false;
};

const toHomePage = () => router.push({ name: "home" });
</script>

<template>
  <default class="container_login">
    <div
      class="slug"
      @click="toHomePage"
      @mouseover="showText"
      @mouseleave="hideText"
    >
      <div class="icon_container">
        <Icon icon="tabler:arrow-left" />
      </div>
      <p :class="{ hidden_text: isTextVisible }">voltar para a home</p>
    </div>
    <div class="banner_bg"></div>
    <div class="login_area">
      <figure>
        <img :src="logo" alt="Logo ProDescriber" />
        <figcaption>
          <h3>Área de Login</h3>
        </figcaption>
      </figure>
      <form>
        <label for="email">Insira seu e-mail</label>
        <div class="input_layer">
          <input type="email" id="email" placeholder="email@example.com" />
        </div>
        <label for="pass">Insira sua senha</label>
        <div class="input_layer" style="margin-bottom: 10px">
          <input type="password" id="pass" placeholder="minha senha" />
        </div>
        <main-button>Acessar workspace</main-button>
      </form>
    </div>
  </default>
</template>

<style scoped lang="scss">
.banner_bg {
  width: 100%;
  height: 50%;
  background-image: url("../assets/img/dashed_bg.svg");
  background-size: 100px;
  position: absolute;
  top: 0;
  left: 0;
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
    background-color: #fff;
    border-radius: 20px;
    padding: 10px;
    color: #0d0d0d;
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
    }

    svg {
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
    }
  }
  .login_area {
    background-color: #a3a3a3;
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

    form {
      display: flex;
      flex-direction: column;
      gap: 8px;
      color: #0d0d0d;

      .input_layer {
        background-color: #fff;
        height: 40px;
        border-radius: 6px;
        padding: 5px 10px;

        input {
          width: 100%;
          height: 100%;
          border: none;
          outline: none;
          font-size: 1rem;
        }
      }
    }
  }
}
</style>
