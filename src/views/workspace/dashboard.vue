<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Icon } from "@iconify/vue";
import MainButton from "../../components/Button/index.vue";
import BaseInput from "../../components/Inputs/BaseInput.vue";
import SaveDescription from "../../components/Modals/SaveDescription.vue";
import CreateDescriptionWorkspace from "../../components/Forms/CreateDescriptionWorkspace.vue";
import ToolServices from "../../components/ToolService/index.vue";
import openAIService from "../../services/openai.service";
import { Openai } from "../../types/openai";
import { useHttp } from "../../composables/useHttp";
import { useOpenAIStore } from "../../store/openai";
import { navigationServices } from "../../composables/useOptions";

const { descriptionContent } = useOpenAIStore();
const { filterResponse } = useHttp();

const product = ref("");
const descriptionModal = ref<typeof CreateDescriptionWorkspace | null>(null);
const showDescription = ref(false);
const savedescription = ref<typeof SaveDescription | null>(null);
const listDescriptions = ref([] as Openai.ChatResponse[]);
const descriptionId = ref("");

const toggleDescription = (id: string) => {
  descriptionId.value = id;
  showDescription.value = !showDescription.value;
};

const handleSearchProduct = () => {
  console.log("Encontrou o produto!", product.value);
};

const showModalWhenDescriptionExists = () => {
  const description = descriptionContent.result;
  description && savedescription.value?.showModal();
};

const openCreateNewDescription = () => {
  descriptionModal.value?.openModal();
};

const getListDescriptions = () => {
  const config = filterResponse({
    _id: "_id",
    prompt: "message.content",
    result: "result.message.content",
  });
  openAIService.listDescriptions(config).then((response) => {
    const { data } = response;
    const renderLastFiveDescriptions = data.reverse().slice(0, 5);
    listDescriptions.value = renderLastFiveDescriptions;
  });
};

onMounted(() => {
  showModalWhenDescriptionExists();
  getListDescriptions();
});
</script>

<template>
  <div class="dashboard_container">
    <save-description ref="savedescription" />
    <create-description-workspace ref="descriptionModal" />
    <div class="inner_header">
      <h2>Dashboard - Gerenciador de Lista</h2>
      <div class="toolbar">
        <base-input
          :placeholder="'Procure um produto'"
          :icon="true"
          v-model="product"
          @action="handleSearchProduct"
        />
        <div class="data_select">
          <div
            style="
              padding: 5px;
              background-color: #e7e6e8;
              border-radius: 6px;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <Icon icon="tabler:chevron-down" />
          </div>
          <span style="font-weight: 600; margin: 5px">Hoje</span>
          <div
            style="
              padding: 5px;
              border-radius: 6px;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <Icon icon="tabler:menu" />
          </div>
        </div>
        <main-button class="config_button" @click="openCreateNewDescription">
          Criar uma nova Descrição
          <Icon icon="tabler:plus" />
        </main-button>
      </div>
    </div>
    <div>
      <h2>Ferramentas mais populares</h2>
      <div class="flex items-center gap-3 flex-wrap mb-8 mt-5">
        <tool-services
          v-for="service in navigationServices"
          :key="service.id"
          v-bind="service"
        />
      </div>
    </div>
    <div class="description_container">
      <h2>Descrições mais recentes</h2>
      <ul class="mt-5">
        <li v-for="description in listDescriptions" :key="description._id">
          <div style="display: flex">
            <div
              class="description_title"
              @click="toggleDescription(description._id as string)"
            >
              <p>
                {{ description.prompt }}
              </p>
            </div>
            <div class="icon">
              <Icon icon="tabler:dots-vertical" />
            </div>
          </div>
          <div
            v-if="showDescription && descriptionId === description._id"
            class="description"
          >
            {{ description.result }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboard_container {
  height: 100%;
  overflow-y: auto;
  padding-right: 30px;

  .inner_header {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;

    h2 {
      margin: 30px 0;
      font-weight: 600;
      font-size: 1.5rem;
    }

    .toolbar {
      display: flex;
      gap: 10px;

      .data_select {
        background-color: #fff;
        border-radius: 6px;
        padding: 0 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 150px;
      }
      .config_button {
        display: flex;
        align-items: center;
        color: #fff;
        background-color: #28a900;

        svg {
          margin-left: 10px;
        }
      }
    }
  }

  .description_container {
    background-color: #e7e6e8;
    height: 75%;
    border-radius: 4px;

    ul {
      overflow: auto;
      display: flex;
      flex-direction: column;
      gap: 6px;

      li {
        background-color: #ffffff;
        border-radius: 6px;
        padding: 10px;
      }
      .description_title {
        display: flex;
        flex: 1;
        justify-content: space-between;
        align-items: center;
      }
      .icon {
        background-color: #e7e6e8;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        border-radius: 4px;
      }

      .description {
        margin-top: 10px;
        background-color: #e7e6e8;
        padding: 10px;
        border-radius: 4px;
      }
    }
  }
}
</style>
