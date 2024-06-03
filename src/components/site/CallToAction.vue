<script setup lang="ts">
import { Icon } from "@iconify/vue";
import MainButton from "../Button/index.vue";
import { useNavigation } from "../../composables/useNavigarion";

const { registration } = useNavigation();
</script>

<template>
  <div class="bg-dark-1000 p-24 bg-banner">
    <div class="container flex justify-start">
      <div class="row w-1/2">
        <div class="col-md-12">
          <h2 class="text-3xl mb-8">Veja o ProDescriber em ação!</h2>
          <p class="mb-8">
            Comece gratuitamente e descubra como otimizar o dia a dia das suas atividades de negócio e ganhar maior produtividade com seu assistente de IA.
          </p>
          <MainButton @click="registration" class="py-2 border-2 border-gray-1050 bg-white text-gray-1050">
            Comece agora Gratuitamente
            <Icon :icon="'tabler:wand'" class="ml-2" />
          </MainButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg-banner {
  background-image: url('../../assets/img/banner2.png');
  background-repeat: no-repeat;
  background-position: top 48% right 0;
  background-size: 50%;
}
</style>