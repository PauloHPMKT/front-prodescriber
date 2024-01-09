<script setup lang="ts">
import logo from "../../assets/img/logo_prodescriber.png";

const callFormRegister = () => {
  alert("callFormRegister");
};
</script>

<template>
  <header>
    <div class="logo_container">
      <img :src="logo" alt="Logo ProDescriber" />
    </div>
    <div>
      <button @click="callFormRegister">Criar sua conta</button>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 50px;

  .logo_container {
    width: 180px;
    padding: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
    }
  }
}
</style>
