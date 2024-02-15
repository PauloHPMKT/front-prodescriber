<script setup lang="ts">
import BaseInput from "../Inputs/BaseInput.vue";
import MainButton from "../Button/index.vue";
import { ref } from "vue";
import { Account } from "../../types/account";

const emit = defineEmits(["handleLogin"]);

const dataToLogin = ref<Account.Login>({
  email: "",
  password: "",
});

const handleLogin = () => {
  emit("handleLogin", dataToLogin.value);
};
</script>

<template>
  <form @submit.prevent="handleLogin">
    <base-input
      v-model="dataToLogin.email"
      :label="'Insira seu e-mail'"
      :placeholder="'email@example.com'"
    />
    <base-input
      v-model="dataToLogin.password"
      :label="'Insira sua senha'"
      :placeholder="'Senha'"
      :hide-password-revealler="true"
    />
    <label
      for="connect"
      style="margin-top: 10px; display: flex; font-size: 0.8rem"
    >
      <input
        type="checkbox"
        id="connect"
        style="
          outline: none;
          display: inline-block;
          width: 15px;
          height: 15px;
          background-color: #ccc;
          border-radius: 6px;
          margin-right: 7px;
        "
      />
      Mantenha-me conectado
    </label>
    <div style="margin-top: 30px; text-align: center">
      <main-button class="btn_button text-white" type="submit"
        >Acessar workspace</main-button
      >
    </div>
  </form>
</template>

<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;
  color: #0d0d0d;
  gap: 8px;

  .btn_button {
    border: 1px solid #c5c5c51c;
    background-image: linear-gradient(45deg, #202020, #292727);
    transition: all 0.3s ease-out;
    padding-top: 7px;
    padding-bottom: 7px;

    &:hover {
      filter: drop-shadow(0 0 0.4rem #c5c5c5);
      cursor: pointer;
    }
  }
}
</style>
