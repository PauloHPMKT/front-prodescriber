<script setup lang="ts">
import { Icon } from "@iconify/vue";
import MainButton from "../Button/index.vue";
import type { Breadcrumb } from "../../types/interfaces";

const props = defineProps<{
  buttons: Breadcrumb.Buttons[];
}>();

const emit = defineEmits(["actions"]);

const actions = (prop: string) => {
  emit("actions", prop);
};
</script>

<template>
  <div class="breadcrumb_buttons">
    <main-button
      v-for="(button, index) in props.buttons"
      :key="index"
      @click="actions(button.action)"
      class="bg-slate-800 text-slate-400"
    >
      {{ button.label }}
      <Icon :icon="`iconamoon:${button.icon}`" class="ms-2" />
    </main-button>
  </div>
</template>

<style scoped lang="scss">
.breadcrumb_buttons {
  display: flex;
  gap: 10px;
}
</style>
