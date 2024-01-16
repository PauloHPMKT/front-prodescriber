<script setup lang="ts">
import BaseInput from "../Inputs/BaseInput.vue";
import MainButton from "../Button/index.vue";
import { ref } from "vue";

const emit = defineEmits(["handleLogin"]);

const dataToLogin = ref({
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
    <div style="margin-top: 30px; text-align: center">
      <main-button type="submit">Acessar workspace</main-button>
    </div>
  </form>
</template>

<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;
  color: #0d0d0d;
  gap: 8px;
}
</style>
