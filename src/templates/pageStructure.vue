<script setup lang="ts">
import Sidebar from "../components/Sidebar/index.vue";
import Content from "./content.vue";
</script>

<template>
  <div class="structure">
    <sidebar />
    <div class="container">
      <header class="user_header">
        <div>
          <span>Bem vindo(a) Nome do usuario logado</span>
        </div>
        <div class="user_info">
          <p>Nome do usuário</p>
          <p>Logout</p>
        </div>
      </header>
      <main>
        <Content />
      </main>
      <footer>footer</footer>
    </div>
  </div>
</template>

<style scoped lang="scss">
.structure {
  display: flex;

  .container {
    width: 100%;
    height: 100vh;
    background-color: red;

    .user_header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 10px 20px 16%;
      background-color: blue;
      height: 10vh;
      border-bottom: 1px solid #121212;
    }
  }
}
</style>
