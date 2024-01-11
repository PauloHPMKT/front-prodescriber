<script setup lang="ts">
import { ref } from "vue";
import MainHeader from "../components/Header/index.vue";
import MainButton from "../components/Button/index.vue";
import FormDescription from "../components/Forms/FormDescription.vue";
import LoadSpinner from "../components/Loaders/LoadSpinner.vue";
import BreadcrumbButtons from "../components/BreadcrumbButtons/index.vue";
import Default from "../templates/default.vue";
import DefaultIcon from "../components/Icons/defaultIcon.vue";
import StatusPopup from "../components/Popup/Status.vue";

import openAIService from "../services/openai.service";
import type { BreadcrumbButtons as Crumber } from "../types/interfaces";
import { usePopup } from "../composables/usePopup";

const { popupStatus } = usePopup();

const showDemo = ref(true);
const show = ref(false);
const loading = ref(false);
const isActive = ref(false);
const isError = ref(false);
const result = ref("");
const message = ref("");
const breadcrumbButtons = ref([
  {
    label: "Gostei",
    action: "like",
  },
  {
    label: "Não gostei",
    action: "dislike",
  },
  {
    label: "Gerar outra descrição",
    action: "generate",
  },
] as Crumber[]);

const triggerActions = (actions: string) => {
  switch (actions) {
    case "like":
      console.log("like");
      break;
    case "dislike":
      console.log("dislike");
      break;
    case "generate":
      showDemo.value = !showDemo.value;
      break;
    default:
      break;
  }
};

const submitDescription = (description: string) => {
  loading.value = true;
  showDemo.value = false;

  const requestData = {
    messages: [
      {
        role: "user",
        content: description,
      },
    ],
  };

  openAIService.createDescription(requestData).then((res) => {
    if (res.status === 200) {
      loading.value = false;
      result.value = res.data.result.message.content;
    }
  });
};

const copyToClipboard = (result: string) => {
  const textToCopy = result;
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      message.value = "Descrição copiada com sucesso!";
      popupStatus(isActive, message.value, 2000);
    })
    .catch((error) => {
      console.error(error);
      if (error) {
        message.value = "Erro ao copiar descrição!";
        popupStatus(isError, message.value, 2000);
      }
    });
};
</script>

<template>
  <div class="home_view">
    <main-header />
    <main>
      <default>
        <div class="banner_bg"></div>
        <div class="content">
          <h1>
            ProDescriber é o seu parceiro confiável para criação de descrições
            de produtos!
          </h1>
          <p>
            Crei descrições de alta qualidade e totalmente SEO-friendly para seu
            produto e impulsione suas vendas. Experimente já o ProDescriber, o
            melhor amigo do seu negócio!
          </p>
          <div>
            <div id="demo" v-if="showDemo">
              <transition name="slide-fade">
                <main-button v-if="show === false" @click="show = !show">
                  Gerar Descrição
                </main-button>
                <form-description v-else @submit="submitDescription" />
              </transition>
            </div>
            <div v-else>
              <div v-if="loading" style="text-align: center">
                <div class="loader_container">
                  <load-spinner :loader_description="'Teste'" />
                </div>
              </div>
              <article v-else class="description">
                <default-icon
                  :name="'tabler:copy'"
                  :title="'Copiar descrição'"
                  class="clipboard"
                  @click="copyToClipboard(result)"
                />
                <status-popup
                  :status_message="message"
                  :class="{ isPopupActive: isActive, hasError: isError }"
                />
                <p class="item">
                  O que achou dessa ideia para o item:
                  <strong>description.item_name</strong>
                </p>
                <p style="user-select: none" class="description-content">
                  {{ result }}
                </p>
                <footer class="card-description-footer">
                  <breadcrumb-buttons
                    :buttons="breadcrumbButtons"
                    @actions="triggerActions"
                  />
                </footer>
              </article>
            </div>
          </div>
        </div>
      </default>
    </main>
  </div>
</template>

<style scoped lang="scss">
.home_view {
  margin: 0 auto;
  height: 100vh;

  .banner_bg {
    width: 100%;
    height: 100%;
    background-image: url("../assets/img/dashed_bg.svg");
    background-size: 100px;
    position: absolute;
    top: 0;
    left: 0;
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(125deg)
      brightness(1000%);
    z-index: -1;
  }
  .content {
    width: 80%;
    text-align: center;
    margin: 0 auto;

    h1 {
      font-size: 2.8rem;
      font-weight: 600;
      line-height: 1.2;
      margin-bottom: 35px;
    }

    p {
      line-height: 1.5;
      font-size: 1.25rem;
      color: #a3a3a3;
      padding: 0 50px;
    }

    #demo {
      position: relative;
      margin: 45px 0;

      button {
        position: absolute;
        transform: translate(-50%);
      }

      .slide-fade-enter-active {
        transition: all 0.4s ease-out;
      }

      .slide-fade-leave-active {
        transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
      }

      .slide-fade-enter-from,
      .slide-fade-leave-to {
        transform: translateX(20px);
        opacity: 0;
      }
    }

    .loader_container {
      margin: 30px auto;
      padding: 30px;
      width: 600px;
      border-radius: 8px;
    }

    .description {
      margin: 30px;
      padding: 30px;
      border-radius: 8px;
      background: #fff;
      position: relative;

      .clipboard {
        border-radius: 6px;
        width: 36px;
        height: 36px;
        padding: 5px;
        color: #121212;
        font-size: 1.5rem;
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        &:hover {
          background-color: #121212;
          color: #fff;
        }
      }

      .item,
      .description-content {
        color: #121212;
        margin-bottom: 20px;
      }

      .card-description-footer {
        margin-top: 50px;
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
