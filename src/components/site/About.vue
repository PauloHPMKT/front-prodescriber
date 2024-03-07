<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const recipies = ref([
  {
    title: "Gerador de descição",
    icon: "tabler:file-description",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis ipsum dicta sed, facere corrupti optio quam, quasi architecto quidem veniam inventore, debitis assumenda enim temporibus nulla qui culpa ducimus doloremque.",
  },
  {
    title: "Tradutor",
    icon: "tabler:language",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis ipsum dicta sed, facere corrupti optio quam, quasi architecto quidem veniam inventore, debitis assumenda enim temporibus nulla qui culpa ducimus doloremque.",
  },
  {
    title: "Revisor de conteúdos",
    icon: "tabler:text-grammar",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis ipsum dicta sed, facere corrupti optio quam, quasi architecto quidem veniam inventore, debitis assumenda enim temporibus nulla qui culpa ducimus doloremque.",
  },
]);
</script>

<template>
  <div class="about_area text-center">
    <div class="flex justify-center items-center">
      <Icon icon="tabler:recharging" class="text-[30px] mt-1 mr-3" />
      <h1 class="text-4xl">
        <span class="text-slate-300">Melhore</span> o desempenho de seus
        negócios
      </h1>
    </div>
    <p class="py-3">
      Descubra mais do que você já fez com a IA. Maximize sua produtividade.
      <br />Otimize seu tempo!
    </p>
    <div class="mt-20">
      <ul class="flex px-14">
        <li
          v-for="recipe in recipies"
          :key="recipe.title"
          class="w-2/6 flex justify-center"
        >
          <div class="flex flex-col items-center w-80">
            <div
              class="rounded-[100%] mb-4 bg-black w-10 h-10 flex justify-center items-center"
            >
              <Icon :icon="recipe.icon" />
            </div>
            <h2>{{ recipe.title }}</h2>
            <p class="my-3">{{ recipe.description }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.about_area {
  border-top: 2px solid #028a616e;
  border-top-left-radius: 75px;
  border-top-right-radius: 75px;
  background-image: linear-gradient(180deg, #06503a6e, #12121200);
  padding: 50px 0;
}
</style>
