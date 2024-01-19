<script setup lang="ts">
import { useRouter } from "vue-router";
import MainButton from "../Button/index.vue";
import logo from "../../assets/img/logo_prodescriber.png";
import { Icon } from "@iconify/vue";

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
      <main-button @action="toLogin">
        Acesse seu workspace
        <Icon icon="tabler:user-up" />
      </main-button>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0d0d0d;
  padding: 0 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid #131313;

  .logo_container {
    width: 180px;
    padding: 30px 0;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
    }
  }
}
</style>
