<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import InputField from "../components/Inputs/InputField.vue";
import GeneralButton from "../components/Button/GeneralButton.vue";
import BackTo from "../components/Icons/BackTo.vue";
import logo from "../assets/img/logo_prodescriber.png";

const router = useRouter();

const formData = reactive({
  name: "",
  nickname: "",
  email: "",
  password: "",
});

const backToHome = () => {
  router.push({ name: "home" });
};

const alerta = () => {
  console.log(formData);
};
</script>

<template>
  <div class="h-screen relative flex flex-col justify-center items-center">
    <img
      :src="logo"
      alt="Logo ProDescriber"
      class="filter invert opacity-85 absolute top-4 left-4 w-[200px]"
    />
    <BackTo message="Voltar para a Home" @navigateAction="backToHome" />
    <h2 class="font-bold text-[1.56rem] text-gray-950 mb-6">
      Crie seu Workspace Gratuitamente
    </h2>
    <p class="mb-6">
      Já possui uma conta? <span class="underline">Faça Login</span>
    </p>
    <form
      @submit.prevent="alerta"
      class="w-[400px] flex flex-col gap-4 justify-center items-center"
    >
      <InputField placeholder="Nome de Usuário" v-model="formData.name" />
      <InputField placeholder="Nickname" v-model="formData.nickname" />
      <InputField placeholder="E-mail de Usuário" v-model="formData.email" />
      <InputField
        placeholder="Senha"
        :isPassword="true"
        v-model="formData.password"
      />
      <GeneralButton class="w-full h-14"> Criar Workspace </GeneralButton>
    </form>
  </div>
</template>

<style scoped>
input:focus + label,
input:not(:placeholder-shown) + label {
  top: 0;
  padding: 4px;
  font-size: 0.75rem;
  color: #01000c;
}
</style>
