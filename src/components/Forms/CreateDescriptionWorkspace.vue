<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import overlay from "../../templates/overlay.vue";
import BaseInput from "../Inputs/BaseInput.vue";
import MainButton from "../Button/index.vue";
import Description from "../Description/index.vue";

import loadingBot from "../../assets/lottie_animations/loadingBot.json";

import { useOpenai } from "../../composables/useOpenai";
import { useOpenAIStore } from "../../store/openai";
import { useAuthStore } from "../../store";
import { Vue3Lottie } from "vue3-lottie";

const {
  createOpenaiDescription,
  storeDescriptionContent,
  descriptionContent,
  cleanStore,
} = useOpenAIStore();
const authStore = useAuthStore();
const { chatRequest } = useOpenai();

const isOpen = ref(false);
const loading = ref(false);
const product = ref("");
const result = ref("");
const dataToGenerate = ref({
  product_name: "",
  product_description: "",
  product_category: "",
  target_audience: "",
  place: "",
});

const emit = defineEmits(["submit"]);

const createDescription = async () => {
  loading.value = true;
  const prompt = `Gere uma descrição resumida e eficiente, SEO-friendly para o produto: ${dataToGenerate.value.product_name}.`;
  const gptRole = authStore.currentUser.role_gpt_generate || "user";
  const request = chatRequest(gptRole, prompt);
  /**
   *
   * Criar a logica para salvar um novo objeto mais complexo
   * tem que pegar o id do usuario e salvar o objeto com o id do usuario
   * será necessario alterar a estrutura da API e o modelo do banco
   */
  const generate = await createOpenaiDescription(request);
  const { data, status } = generate;
  if (status === 200) {
    product.value = dataToGenerate.value.product_name;
    result.value = data.result.message.content;
    const storeContent = {
      item: product.value,
      prompt,
      result: result.value,
    };
    loading.value = false;
    storeDescriptionContent(storeContent);
  }
};

const openModal = () => {
  scrollToTop();
  isOpen.value = true;
  if (descriptionContent.result) return cleanStore();
};

const closeModal = () => {
  isOpen.value = false;
};

const scrollToTop = () => {
  const formContainer = document.querySelector("#form");
  if (formContainer) formContainer.scrollTop = 0;
};

defineExpose({
  openModal,
  closeModal,
});
</script>

<template>
  <overlay
    class="overlay"
    :style="{
      opacity: isOpen ? '1' : '0',
      pointerEvents: isOpen ? 'auto' : 'none',
    }"
  >
    <div class="container_form" :class="{ isActive: isOpen }">
      <div class="form_generate">
        <div class="actions">ações</div>
        <form id="form" @submit.prevent="createDescription">
          <h1>Gerar Descrição</h1>
          <p>
            Preencha os campos abaixo para gerar uma descrição de alta qualidade
            para seu produto!
          </p>
          <div class="fields">
            <div class="spacing">
              <base-input
                v-model="dataToGenerate.product_name"
                :label="'Nome do produto'"
                :placeholder="'iPhone 12, Smartv 4k, etc...'"
              />
            </div>
            <div class="spacing">
              <label for="product_description">Descrição do produto</label>
              <div class="textarea_layer">
                <textarea
                  id="product_description"
                  placeholder="Conte-nos um pouco sobre o que é seu produto ou serviço."
                ></textarea>
              </div>
            </div>
            <div class="spacing">
              <base-input
                v-model="dataToGenerate.product_category"
                :label="'Categoria do produto'"
                :placeholder="'Eletronico, Informatica, etc...'"
              />
            </div>
            <hr />
            <h3 style="margin: 40px 0">
              Segmentação - Insira dados referente ao seu público alvo
            </h3>
            <div class="spacing">
              <base-input
                v-model="dataToGenerate.target_audience"
                :label="'Público alvo'"
                :placeholder="'Eletronico, Informatica, etc...'"
              />
              <!-- <select type="text" id="target_audience">
                <option value="1">Homens</option>
                <option value="2">Mulheres</option>
                <option value="3">Unissex</option>
              </select> -->
            </div>
            <div class="spacing">
              <base-input
                v-model="dataToGenerate.place"
                :label="'Local do publico alvo'"
                :placeholder="'Cidade, Estado, País, etc...'"
              />
            </div>
          </div>
          <div class="action_button">
            <main-button type="submit">
              Gerar descrição
              <Icon icon="tabler:wand" />
            </main-button>
            <main-button @click.prevent="closeModal">Sair</main-button>
          </div>
        </form>
      </div>
      <div class="description_area">
        <div v-if="!loading && !result">
          <Vue3Lottie
            :animationData="loadingBot"
            :height="220"
            :width="220"
            :loop="false"
          />
          <h5>Olá, em que posso ajudar?</h5>
        </div>
        <div v-else>
          <div v-if="loading">
            <Vue3Lottie
              :animationData="loadingBot"
              :speed="3"
              :height="220"
              :width="220"
            />
            <h5>Que ótimo! vou gerar a melhor descrição para você!</h5>
          </div>
          <div v-else>
            <description>
              <button>Salvar</button>
              <button>Gerar Nova descrição</button>
              <button>Sair</button>
            </description>
          </div>
        </div>
      </div>
    </div>
  </overlay>
</template>

<style scoped lang="scss">
.container_form {
  box-shadow: -2px -2px 10px #00000045;
  position: fixed;
  display: flex;
  background-color: #fff;
  right: -100%;
  height: 80%;
  width: 80%;
  margin: 30px;
  border-radius: 8px;
  transition: right 0.3s ease-in-out;
  overflow: hidden;

  .form_generate {
    display: flex;

    width: 50%;
    .actions {
      border-right: 1px solid #d3d3d3;
      width: 15%;
      padding: 30px;
    }

    form {
      width: 85%;
      padding: 30px;
      overflow-y: scroll;

      .fields {
        margin-top: 40px;

        .spacing {
          margin-bottom: 15px;
          .textarea_layer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #fff;
            height: 120px;
            border-radius: 6px;
            padding: 5px 10px;
            box-shadow: -1px 0 5px rgba(0, 0, 0, 0.1);

            textarea {
              width: 100%;
              height: 100%;
              border: none;
              outline: none;
              font-size: 1rem;
              font-family: "Roboto", sans-serif;
              resize: none;
            }
          }
        }
      }
      .action_button {
        display: flex;
        gap: 8px;
        margin-top: 50px;

        button {
          &:first-child {
            background: #000;
            color: #fff;
          }

          svg {
            margin-left: 10px;
            font-size: 1.2rem;
          }
        }
      }
    }
  }

  .description_area {
    width: 50%;
    background-color: #e7e6e8;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 40px;

    .fade-enter-active,
    .fade-leave-active {
      transition: 400ms ease all;
    }
    .fade-enter-from,
    .fade-leave-to {
      opacity: 0;
      transform: translateX(-100px);
      max-width: 100%;
    }
  }
}
.isActive {
  top: 7%;
  right: 8%;
}
</style>
