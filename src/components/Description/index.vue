<script setup lang="ts">
import DefaultIcon from "../Icons/defaultIcon.vue";
import { DescriptionProps } from "../../types/interfaces";

import { useClipboard } from "../../composables/useClipboard";
const { copyToClipboard } = useClipboard();

defineProps<DescriptionProps>();
const emit = defineEmits(["to_show_popup"]);

const handleCopyToClipboard = async (result: string) => {
  copyToClipboard(result);
  emit("to_show_popup", "Descrição copiada com sucesso!");
};
</script>

<template>
  <article class="description">
    <default-icon
      :name="'tabler:copy'"
      :title="'Copiar descrição'"
      class="clipboard"
      @click="handleCopyToClipboard(result)"
    />
    <p class="item">{{ item }}</p>
    <p style="user-select: none" class="description-content">
      {{ result }}
    </p>
    <footer class="card-description-footer">
      <slot></slot>
    </footer>
  </article>
</template>

<style scoped lang="scss">
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
</style>
