<script setup lang="ts">
import Sidebar from "../components/Sidebar/index.vue";
import Content from "./content.vue";
import { useOnMounted } from "../composables/useOnMounted";
import { onMounted } from "vue";

const { dateTimeFormated } = useOnMounted();

onMounted(() => {
  dateTimeFormated();
});
</script>

<template>
  <div class="structure">
    <sidebar />
    <div class="container">
      <header class="user_header">
        <div class="greetings">
          <p>Bom dia, Nome do usuario logado👋</p>
          <span>{{ dateTimeFormated() }}</span>
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
    width: 85%;
    background-color: #e7e6e8;
    color: #121212;
    height: 100vh;
    display: flex;
    flex-direction: column;
    flex: 1;

    .user_header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;
      background-color: #f9f8f9;
      flex: 0 0 10vh;

      .greetings {
        display: flex;
        flex-direction: column;

        p {
          color: #121212;
          font-weight: 600;
        }

        span {
          color: #a3a3a3;
          font-size: 0.9rem;
        }
      }
    }

    main {
      margin: 0 90px;
      overflow: hidden;
      height: 82vh;
    }

    footer {
      height: 8vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f9f8f9;
    }
  }
}
</style>
