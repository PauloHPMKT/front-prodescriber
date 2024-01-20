<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import MainButton from "../../components/Button/index.vue";
import BaseInput from "../../components/Inputs/BaseInput.vue";
import SaveDescription from "../../components/Modals/saveDescription.vue";

const router = useRouter();

const product = ref("");
const description = ref(router.currentRoute.value.query.description);
const save_description = ref(null);
const showDescription = ref(false);
const isDescriptionToSave = ref(false);

const toggleDescription = () => {
  showDescription.value = !showDescription.value;
};

const handleSearchProduct = () => {
  console.log("Encontrou o produto!", product.value);
};

const showModalWhenDescriptionExists = () => {
  if (description.value) isDescriptionToSave.value = true;
};

onMounted(() => {
  showModalWhenDescriptionExists();
});
</script>

<template>
  <div class="dashboard_container">
    <save-description
      ref="save_description"
      :description="description"
      v-if="isDescriptionToSave"
    />
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
        <main-button class="config_button">
          Criar uma nova Descrição
          <Icon icon="tabler:plus" />
        </main-button>
      </div>
    </div>
    <div class="description_container">
      <ul>
        <li>
          <div @click="toggleDescription" class="description_title">
            <p>Descrição para o produto: Notebook Lenovo 16gb i5</p>
            <div class="icon">
              <Icon icon="tabler:dots-vertical" />
            </div>
          </div>
          <div v-if="showDescription" class="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam atque
            officiis tenetur aspernatur modi asperiores eveniet? Dicta aut animi
            et in illo officia libero, vel, maiores voluptates, velit mollitia
            deserunt?
          </div>
        </li>
        <li>
          <div @click="toggleDescription" class="description_title">
            <p>Descrição para o produto: Notebook Lenovo 16gb i5</p>
            <div class="icon">
              <Icon icon="tabler:dots-vertical" />
            </div>
          </div>
          <div v-if="showDescription" class="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam atque
            officiis tenetur aspernatur modi asperiores eveniet? Dicta aut animi
            et in illo officia libero, vel, maiores voluptates, velit mollitia
            deserunt?
          </div>
        </li>
        <li>
          <div @click="toggleDescription" class="description_title">
            <p>Descrição para o produto: Notebook Lenovo 16gb i5</p>
            <div class="icon">
              <Icon icon="tabler:dots-vertical" />
            </div>
          </div>
          <div v-if="showDescription" class="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam atque
            officiis tenetur aspernatur modi asperiores eveniet? Dicta aut animi
            et in illo officia libero, vel, maiores voluptates, velit mollitia
            deserunt?
          </div>
        </li>
        <li @click="toggleDescription">
          <div class="description_title">
            <p>Descrição para o produto: Notebook Lenovo 16gb i5</p>
            <div class="icon">
              <Icon icon="tabler:dots-vertical" />
            </div>
          </div>
          <div v-if="showDescription" class="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam atque
            officiis tenetur aspernatur modi asperiores eveniet? Dicta aut animi
            et in illo officia libero, vel, maiores voluptates, velit mollitia
            deserunt?
          </div>
        </li>
        <li @click="toggleDescription">
          <div class="description_title">
            <p>Descrição para o produto: Notebook Lenovo 16gb i5</p>
            <div class="icon">
              <Icon icon="tabler:dots-vertical" />
            </div>
          </div>
          <div v-if="showDescription" class="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam atque
            officiis tenetur aspernatur modi asperiores eveniet? Dicta aut animi
            et in illo officia libero, vel, maiores voluptates, velit mollitia
            deserunt?
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboard_container {
  height: 80vh;
  overflow: hidden;

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
    overflow: auto;
    border-radius: 4px;

    ul {
      display: flex;
      flex-direction: column;
      gap: 6px;
      height: 30px;

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

        .icon {
          background-color: #e7e6e8;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;
          border-radius: 4px;
        }
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
