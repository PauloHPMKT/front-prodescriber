<script setup lang="ts">
import { onMounted, ref } from "vue";
import userService from "../../services/user.service";
import { Account } from "../../types/account";
import { useAuthStore } from "../../store";

const authStore = useAuthStore();

const userData = ref({
  username: "",
  email: "",
});

const updateUser = async (data: Account.Update, id: string) => {
  await userService.updateUserInfo(id, data);

  const currentUserData: Partial<Account.Update> = {
    username: data.username,
    email: data.email,
  };
  authStore.getCurrentUser(currentUserData);
};

onMounted(() => {
  userData.value.username = authStore.$state.currentUser.username ?? "";
  userData.value.email = authStore.$state.currentUser.email ?? "";
});
</script>

<template>
  <div class="profile_container">
    <div class="inner_header border-b-2 border-slate-300 pb-[20px]">
      <h2>Área do usuário</h2>
    </div>
    <form
      @submit.prevent="
        updateUser(userData, String(authStore.$state.currentUser._id))
      "
      class="flex gap-3 flex-col items-start w-full"
    >
      <div class="w-[80%] flex gap-3">
        <div class="flex flex-col w-1/2">
          <label for="username">Nome do usuário</label>
          <input
            type="text"
            id="username"
            v-model="userData.username"
            placeholder="Nome de usuário"
            class="border-2 border-slate-300 rounded-md p-2"
          />
        </div>
        <div class="flex flex-col w-1/2">
          <label for="email">E-mail do usuário</label>
          <input
            type="email"
            v-model="userData.email"
            placeholder="E-mail de usuário"
            class="border-2 border-slate-300 bg-slate-50 rounded-md p-2 disabled:opacity-60"
            disabled
          />
        </div>
      </div>
      <button type="submit" class="w-[80px] bg-black text-white rounded-lg">
        Salvar
      </button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.profile_container {
  height: 100%;
  overflow-y: auto;

  .inner_header {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin: 20px 0;

    h2 {
      font-weight: 600;
      font-size: 1.5rem;
    }
  }
}
</style>
