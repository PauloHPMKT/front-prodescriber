<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import MainButton from "../Button/index.vue";

const description = ref("");

const emit = defineEmits(["submit"]);

const submit = () => {
  emit("submit", description.value);
};
</script>

<template>
  <form @submit.prevent="submit">
    <div class="base_input">
      <input
        type="text"
        class="text-black"
        v-model="description"
        placeholder="Insira seu melhor produto"
      />
      <main-button class="button" type="submit">
        Gerar descrição
        <Icon :icon="'tabler:wand'" />
      </main-button>
    </div>
  </form>
</template>

<style scoped lang="scss">
.base_input {
  background: #fff;
  width: 600px;
  border: 1px solid #fff;
  border-radius: 8px;
  text-align: start;
  margin: 0 auto;
  padding: 0 15px;
  height: 44px;
  position: relative;

  input {
    font-size: 1rem;
    border: none;
    outline: none;
    height: 100%;
    width: 73%;
  }

  .button {
    background: #000;
    color: #fff;
    position: absolute;
    right: -87px;
    transform: translate(-50%, 2%);

    svg {
      margin-left: 10px;
      font-size: 1.2rem;
    }
  }
}
</style>
