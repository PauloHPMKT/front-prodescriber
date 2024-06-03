<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";

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
  <div class="py-12 text-center bg-gradient-to-b from-gray-200 to-gray-300">
    <div class="flex justify-center items-center">
      <Icon icon="tabler:recharging" class="text-[30px] mt-1 mr-3 text-slate-900" />
      <h2 class="text-4xl text-black">
        <span class="text-slate-900">Melhore</span> o desempenho de seus
        negócios
      </h2>
    </div>
    <p class="py-3 text-gray-800 text-[16px]">
      Descubra mais do que você já fez com a IA. Maximize sua produtividade.
      <br />Otimize seu tempo!
    </p>
    <div class="mt-20">
      <ul class="flex px-14">
        <li
          v-for="{ title, icon, description } in recipies"
          :key="title"
          class="w-2/6 flex justify-center"
        >
          <div class="flex flex-col items-center w-80">
            <div
              class="rounded-[100%] mb-4 bg-black w-10 h-10 flex justify-center items-center"
            >
              <Icon :icon="icon" />
            </div>
            <h2 class="text-slate-900 ">{{ title }}</h2>
            <p class="my-3 text-gray-800">{{ description }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
