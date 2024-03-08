<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import SaveDescription from "../../components/Modals/SaveDescription.vue";
import CreateDescriptionWorkspace from "../../components/Forms/CreateDescriptionWorkspace.vue";
import ToolServices from "../../components/ToolService/index.vue";
import BaseInput from "../../components/Inputs/BaseInput.vue";
import openAIService from "../../services/openai.service";
import { Openai } from "../../types/openai";
import { useHttp } from "../../composables/useHttp";
import { useOpenAIStore } from "../../store/openai";
import { navigationServices } from "../../composables/useOptions";
import { navigatePaths } from "../../routers/navigate-paths";

const router = useRouter();

const { descriptionContent } = useOpenAIStore();
const { filterResponse } = useHttp();

//const product = ref("");
const previousRouteName = ref("");
const previousRoutePath = ref(router.options.history.state.back);
const descriptionModal = ref<typeof CreateDescriptionWorkspace | null>(null);
const showDescription = ref(false);
const savedescription = ref<typeof SaveDescription | null>(null);
const listDescriptions = ref([] as Openai.ChatResponse[]);
const descriptionId = ref("");

const toggleDescription = (id: string) => {
  descriptionId.value = id;
  showDescription.value = !showDescription.value;
};

const showModalWhenDescriptionExists = () => {
  const description = descriptionContent.result;
  description && savedescription.value?.showModal();
};

const searchService = () => {
  alert('Aqui é o serviço tal');
}

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

const redirectTo = () => {
  if (typeof previousRoutePath.value === "string") {
    router.push({ path: previousRoutePath.value });
  }
};

watchEffect(() => {
  if (previousRoutePath) {
    const matchedRoute = navigatePaths.find(
      (route) => route.router === previousRoutePath.value
    );
    if (matchedRoute) {
      previousRouteName.value = matchedRoute.description;
      localStorage.setItem("previous_route", matchedRoute.description);
    } else {
      previousRouteName.value = localStorage.getItem(
        "previous_route"
      ) as string;
    }
  }
});

onMounted(() => {
  showModalWhenDescriptionExists();
  getListDescriptions();
});
</script>

<template>
  <div class="dashboard_container">
    <save-description ref="savedescription" />
    <create-description-workspace ref="descriptionModal" />
    <div class="border-b-2 border-slate-300">
      <div class="inner_header">
        <h2>IA Workflows</h2>
      </div>
      <div class="flex justify-between items-center border-t-2 py-2 border-slate-300">
        <div class="flex ">
          <div class="flex items-center">
            <Icon icon="iconamoon:arrow-bottom-left-6-circle-bold" class="mr-2" />
            <p class="text-neutral-900 font-semibold text-lg">
              Acessada recentemente:
            </p>
          </div>
          <div class="ml-5 cursor-pointer flex items-center bg-white p-2 rounded-[18px] border-2 border-slate-200 shadow-sm">
            <div class="bg-black p-2 flex items-center justify-center rounded-full mr-2">
              <Icon icon="tdesign:share" class="text-white"/>
            </div>
            <span class="font-semibold" @click="redirectTo">
              {{ previousRouteName }}
            </span>
          </div>
        </div>
        <div class="w-96">
          <BaseInput placeholder="Encontre um fluxo de IA para te ajudar" :icon="true" @action="searchService" class="w-[100%]"/>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <p>IA Workflows recomendados para o seu plano</p>
      <div class="flex items-center gap-3 flex-wrap mb-8 mt-5">
        <ToolServices
          v-for="service in navigationServices"
          :key="service.id"
          v-bind="service"
        />
      </div>
    </div>
    <div class="description_container">
      <p>Ultimas descrições geradas</p>
      <ul class="mt-5">
        <li>
          <div style="display: flex">
            <div class="description_title">
              <p>description.prompt</p>
            </div>
            <div class="icon">
              <Icon icon="tabler:dots-vertical" />
            </div>
          </div>
          <div v-if="false" class="description">description.result</div>
        </li>
        <li>
          <div style="display: flex">
            <div class="description_title">
              <p>description.prompt</p>
            </div>
            <div class="icon">
              <Icon icon="tabler:dots-vertical" />
            </div>
          </div>
          <div v-if="false" class="description">description.result</div>
        </li>
        <li>
          <div style="display: flex">
            <div class="description_title">
              <p>description.prompt</p>
            </div>
            <div class="icon">
              <Icon icon="tabler:dots-vertical" />
            </div>
          </div>
          <div v-if="false" class="description">description.result</div>
        </li>
        <li>
          <div style="display: flex">
            <div class="description_title">
              <p>description.prompt</p>
            </div>
            <div class="icon">
              <Icon icon="tabler:dots-vertical" />
            </div>
          </div>
          <div v-if="false" class="description">description.result</div>
        </li>
        <li>
          <div style="display: flex">
            <div class="description_title">
              <p>description.prompt</p>
            </div>
            <div class="icon">
              <Icon icon="tabler:dots-vertical" />
            </div>
          </div>
          <div v-if="false" class="description">description.result</div>
        </li>
      </ul>
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

  .inner_header {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin: 20px 0;

    h2 {
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
