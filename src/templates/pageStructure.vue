<script setup lang="ts">
import { computed, onMounted } from "vue";
import Content from "./content.vue";
import Sidebar from "../components/Sidebar/index.vue";
import { useOnMounted } from "../composables/useOnMounted";
import { useAuthStore } from "../store/index";
import { useRouter } from "vue-router";
import { useHelpers } from "../composables/useHelpers";

const router = useRouter();
const authStore = useAuthStore();
const { dateTimeFormated } = useOnMounted();
const { removeMultipleItems, truncate, greetings } = useHelpers();

const username = computed(() => {
  const currentUser = authStore.$state.currentUser.name;
  return truncate(currentUser!);
});

const greetingsMessage = computed(() => {
  return `${greetings()}, ${username.value}👋`;
});

const logout = () => {
  const keys = ["access_token", "auth"];
  removeMultipleItems(keys);
  router.push({ name: "login" });
};

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
          <p>{{ greetingsMessage }}</p>
          <span>{{ dateTimeFormated() }}</span>
        </div>
        <div class="user_info">
          <p>Nome do usuário</p>
          <p @click="logout">Logout</p>
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
