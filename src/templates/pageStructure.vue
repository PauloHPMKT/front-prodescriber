<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed, onMounted, ref } from "vue";
import Content from "./content.vue";
import Sidebar from "../components/Sidebar/index.vue";
import { useOnMounted } from "../composables/useOnMounted";
import { useAuthStore } from "../store/index";
import { useRouter } from "vue-router";
import { useHelpers } from "../composables/useHelpers";

const router = useRouter();
const authStore = useAuthStore();
const { dateTimeFormated } = useOnMounted();
const { removeMultipleKeysStoraged, truncate, truncateText, greetings } =
  useHelpers();

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

const redirectToProfile = () => {
  alert("Aqui vai para o perfil do usuario");
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
  <div class="wrapper">
    <sidebar />
    <div class="container bg-secondary-200">
      <header class="user_header">
        <div class="greetings">
          <p>{{ greetingsMessage }}</p>
          <span>{{ dateTimeFormated() }}</span>
        </div>
        <div @click="showCardProfile" class="user_info bg-red-500">
          <Icon icon="teenyicons:user-circle-solid" />
        </div>
        <div class="card_user" v-if="isCardVisible">
          <div class="pb-[15px] border-b-2">
            <p class="text-zinc-950">
              {{ truncateText(String(authStore.$state.currentUser.email)) }}
            </p>
          </div>
          <p
            @click="redirectToProfile"
            class="py-2 hover:bg-slate-100 cursor-pointer transition rounded-md text-zinc-950"
          >
            Meu perfil
          </p>
          <div
            @click="logout"
            class="py-2 flex items-center cursor-pointer hover:bg-slate-100 transition rounded-md"
          >
            <p class="pr-4 text-zinc-950">Sair</p>
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
.wrapper {
  display: flex;
  max-width: 3000px;
  margin: 0 auto;
  min-height: 100vh;

  .container {
    color: #121212;
    max-width: 100%;
    padding-left: 20%;

    .user_header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex: 0 0 10vh;
      position: sticky;
      left: 0;
      top: 0;
      padding: 10px 20px;
      background-color: #f9f8f9;

      .greetings {
        display: flex;
        flex-direction: column;

        p {
          font-weight: 600;
          color: #121212;
        }

        span {
          color: #a3a3a3;
          font-size: 0.9rem;
        }
      }

      .user_info {
        display: flex;
        font-size: 2rem;
        background-color: #e5e5e5;
        border-radius: 100%;
        align-items: center;
        gap: 10px;
        color: #aeaeae;
        margin-right: 20px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        svg {
          width: 100%;
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
      }
    }

    main {
      padding: 0 40px;
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
