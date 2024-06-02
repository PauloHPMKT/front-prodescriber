<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Container from '../../templates/container.vue';
import { Nullable } from '../../types/utils';
import logoFooter from '../../assets/img/logo_prodescriber.png';

const year = ref<Nullable<number>>(null)

onMounted(() => {
  (() => {
    if (year.value === null) {
      return year.value = new Date().getFullYear();
    }

    return year.value;
  })();
});
</script>

<template>
  <footer class="bg-dark-1000">
    <Container>
      <div class="flex justify-between items-center py-8">
        <div>
          <img :src="logoFooter" alt="Logo ProDescriber" class="w-52" />
          <p class="text-gray-400">© {{ year }} ProDescriber. Todos os direitos reservados.</p>
        </div>
        <div>
          <ul class="flex">
            <!-- AQUI FICARÂO OS LINKS DAS MINHAS REDES SOCIAIS -->
            <li class="mx-2">
              <a href="https://gemini.google.com/" class="text-white">Gemini AI</a>
            </li>
            <li class="mx-2">
              <a href="#" class="text-white">Instagram</a>
            </li>
            <li class="mx-2">
              <a href="#" class="text-white">Linkedin</a>
            </li>
            <li class="mx-2">
              <a href="#" class="text-white">Github</a>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  </footer>
</template>