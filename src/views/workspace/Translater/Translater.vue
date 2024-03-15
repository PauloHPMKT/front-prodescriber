<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref, watch } from "vue";
import { useRouter, RouterLink } from "vue-router";
import PageTitle from "@/components/PageTitle/index.vue";
import { useServiceAIOptions, useServiceDeepLOptions } from "@/composables/useOptions";

const router = useRouter();
const chooseTranslateMode = ref(true);

const handleChoiceClick  = (choise: string) => {
  chooseTranslateMode.value = false;
  router.push({ name: choise });
}

watch(() => router.currentRoute.value.name, (newRouteName) => {
  if (newRouteName === 'translater') {
    chooseTranslateMode.value = true;
  }
});
</script>

<template>
  <div>
    <PageTitle title="Translater" />
    <div class="flex flex-col border-t-2 border-slate-300">
      <div class="text-center pt-6" v-if="chooseTranslateMode">
        <span class="font-semibold text-[18px]">
          Escolha o motor de tradução que deseja utilizar
        </span>
      </div>
      <div 
        v-if="chooseTranslateMode"
        class="flex justify-center gap-2 w-full max-h-[70vh] mt-8 mb-8"
      >
        <div 
          @click="handleChoiceClick('generative-ia')" 
          class="cardDisplay"
        >
          <div class="cardHeader">
            <div class="cardIcon">
              <Icon icon="iconamoon:lightning-1" />
            </div>
            <h3 class="font-semibold text-[1.2rem]">Utilize a IA para traduzir automaticamente</h3>
            <p>Introduza os comandos necessário para execurar a IA</p>
          </div>
          <div class="h-3/4 px-6 py-4 flex justify-center">
            <div class="w-full">
              <ul>
                <li v-for="service in useServiceAIOptions" :key="service.id" class="flex py-4">
                  <Icon :icon="`iconamoon:${service.icon}`" class="text-[30px] mr-4 text-lime-600"/>
                  <span>{{ service.description }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div 
          @click="handleChoiceClick('manual-translater')" 
          class="cardDisplay"
        >
          <div class="cardHeader">
            <div class="cardIcon">
              <Icon icon="mi:filter" />
            </div>
            <h3 class="font-semibold text-[1.2rem]">Traduza Manualmente</h3>
            <p>Introduza manualmente os comandos para traduzir</p>
          </div>
          <div class="h-3/4 px-6 py-4">
            <ul>
              <li v-for="service in useServiceDeepLOptions" :key="service.id" class="flex py-4">
                <Icon :icon="`iconamoon:${service.icon}`" class="text-[30px] mr-4 text-lime-600"/>
                <span>{{ service.description }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="w-full" v-else>
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cardDisplay {
  @apply bg-white 
    w-[500px]
    rounded-[18px]
    cursor-pointer
    overflow-hidden
    border-2
    hover:border-black
    hover:drop-shadow-lg
    transition-all duration-300
}

.cardHeader {
  @apply h-1/4 
    px-6  
    py-4 
    bg-aliceblue 
    flex 
    flex-col 
    items-center 
    justify-center
}

.cardIcon {
  @apply h-10 
    w-10 
    bg-black 
    text-white 
    flex 
    justify-center 
    items-center 
    rounded-full 
    text-lg
    mb-3
}
</style>

<!--
Criar serviço de traadução manual de textos
* Escolha de idioma de origem e destino

e um automatizado com o uso da IA 
* Insira um prompt com o idioma que você prefere 
e a IA irá traduzir para o idioma escolhido
-->import { log } from "console";, onBeforeMountimport { log } from "console";
import { log } from "console";
, onBeforeRouteLeave, onBeforeRouteLeave, onUpdated, onMounted
