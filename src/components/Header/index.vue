<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import MainButton from "../Button/index.vue";
import logo from "../../assets/img/logo_prodescriber.png";

const router = useRouter();

const toLogin = () => {
  const userStoraged = localStorage.getItem("access_token");
  !!userStoraged
    ? router.push({ name: "dashboard" })
    : router.push({ name: "login" });
};
</script>

<template>
  <header>
    <div class="logo_container">
      <img :src="logo" alt="Logo ProDescriber" />
    </div>
    <div>
      <main-button class="bg-button text-gray-950" @action="toLogin">
        Acesse seu workspace
        <Icon icon="tabler:user-up" />
      </main-button>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  padding: 0 150px;
  border-bottom: 1px solid #6767671a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);

  .logo_container {
    width: 180px;
    padding: 30px 0;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      transition: all 0.3s ease-out;

      &:hover {
        cursor: pointer;
        filter: drop-shadow(0 0 0.75rem #c5c5c57c);
      }
    }
  }

  .bg-button {
    border: 1px solid #c5c5c51c;
    color: #fff;
    background-image: linear-gradient(45deg, #202020, #292727);
  }
}
</style>
