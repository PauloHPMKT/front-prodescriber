<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import Content from "./content.vue";
import Sidebar from "../components/Sidebar/index.vue";
import { useOnMounted } from "../composables/useOnMounted";
import { useAuthStore } from "../store/index";
import { useRouter } from "vue-router";
import { useHelpers } from "../composables/useHelpers";
import userIcon from "../assets/img/empty-user.jpg";

const router = useRouter();
const authStore = useAuthStore();
const { dateTimeFormated } = useOnMounted();
const { removeMultipleKeysStoraged, truncate, greetings } = useHelpers();

const isCardVisible = ref(false);

const username = computed(() => {
  const currentUser = authStore.$state.currentUser.username;
  return truncate(currentUser!);
});

const greetingsMessage = computed(() => {
  return `${greetings()}, ${username.value}👋`;
});

const showCardProfile = () => {
  isCardVisible.value = !isCardVisible.value;
};

const logout = () => {
  const keys = ["access_token", "auth"];
  removeMultipleKeysStoraged(keys);
  authStore.logout();
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
        <div @click="showCardProfile" class="user_info">
          <img :src="userIcon" alt="Perfil do usuário" />
        </div>
        <div class="card_user" v-if="isCardVisible">
          <p>Meu perfil</p>
          <div>
            <p @click="logout">Sair</p>
            <Icon icon="tabler:logout" />
          </div>
        </div>
      </header>
      <main class="py-2">
        <Content />
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.structure {
  display: flex;

  .container {
    max-width: 100%;
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
      position: relative;
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

      .user_info {
        display: flex;
        font-size: 2rem;
        background-color: #a3a3a3;
        border-radius: 100%;
        align-items: center;
        gap: 10px;
        color: #ffffff;
        margin-right: 20px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        img {
          width: 50px;
        }

        /* &:hover {
          background-color: #121212;
          color: #e7e6e8;
          padding: 4px 8px;
          border-radius: 6px;
        } */
      }

      .card_user {
        position: absolute;
        right: 50px;
        top: 65px;
        z-index: 3000;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
        background-color: #ffffff;
        border-radius: 6px;
        padding: 15px;
        width: 150px;
      }
    }

    main {
      margin: 0 40px;
      overflow: hidden;
      //height: 88vh;
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
